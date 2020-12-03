/**
 * @jest-environment node
 */

const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const User = require('../models/userModel')
const {
  userOneId,
  userOne,
  userOneToken,
  setupDatabase,
} = require('./config/db')

beforeEach(setupDatabase)

describe('Login / Success Case', () => {
  test('Should login existing user', (done) => {
    request(app)
      .post('/users/login')
      .send({ email: userOne.email, password: userOne.password })
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('access_token', expect.any(String))
        expect(res.body).toHaveProperty('_id', expect.any(String))
        expect(res.body).toHaveProperty('email', userOne.email)
        expect(res.body).toHaveProperty('name', userOne.name)
        expect(res.body).toHaveProperty('phone', userOne.phone)
        done()
      })
  })
})

describe('Login / Error Case', () => {
  test('Failed because of wrong password', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: userOne.email,
        password: '1111111111',
      })
      .end((err, res) => {
        if (err) throw err
        const errors = ['Invalid email or password']
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })

  test('Failed because of email not found', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: 'tralalaalall@gmail.com',
        password: userOne.password,
      })
      .end((err, res) => {
        if (err) throw err
        const errors = ['Invalid email or password']
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })

  test('Failed because of email and password not provided', (done) => {
    request(app)
      .post('/users/login')
      .send({})
      .end((err, res) => {
        if (err) throw err
        const errors = ['Invalid email or password']
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })
})

describe('Register / Success Case', () => {
  test('Should sign up a new user', (done) => {
    const newUser = {
      name: 'Oga Tatsumi',
      phone: '08112108544',
      email: 'ogatatsumi@gmail.com',
      password: 'test123',
    }
    request(app)
      .post('/users')
      .send(newUser)
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('access_token', expect.any(String))
        expect(res.body).toHaveProperty('_id', expect.any(String))
        expect(res.body).toHaveProperty('email', newUser.email)
        expect(res.body).toHaveProperty('name', newUser.name)
        expect(res.body).toHaveProperty('phone', newUser.phone)
        done()
      })
  })
})

describe('Register / Error Case', () => {
  test('Failed because of user already exists', (done) => {
    request(app)
      .post('/users')
      .send({
        email: userOne.email,
        password: userOne.password,
        name: userOne.name,
        phone: userOne.phone,
      })
      .end((err, res) => {
        if (err) throw err
        const errors = ['User already exists']
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })

  test('Failed because of a required field not provided', (done) => {
    request(app)
      .post('/users')
      .send({
        password: userOne.password,
        name: userOne.name,
        phone: userOne.phone,
      })
      .end((err, res) => {
        if (err) throw err
        const errors = ['Email is required']
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })

  test('Failed because of empty fields', (done) => {
    request(app)
      .post('/users')
      .send()
      .end((err, res) => {
        if (err) throw err
        const errors = [
          'Name is required',
          'Phone is required',
          'Email is required',
          'Password is required',
        ]
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })
})

describe('Get Users / Success Case', () => {
  test('Should fetch users', (done) => {
    request(app)
      .get('/users')
      .set('access_token', userOneToken)
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expect.any(Array))
        done()
      })
  })
})

describe('Get Users / Failed Case', () => {
  test('Failed because of token not provided', (done) => {
    request(app)
      .get('/users')
      .end((err, res) => {
        if (err) throw err
        const errors = ['Authentication failed']
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })

  test('Failed because of invalid token', (done) => {
    request(app)
      .get('/users')
      .set('access_token', 'token')
      .end((err, res) => {
        if (err) throw err
        const errors = ['Authentication failed']
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })
})

describe('Delete User / Success Case', () => {
  test('Should delete a user', (done) => {
    request(app)
      .delete(`/users/${userOneId}`)
      .set('access_token', userOneToken)
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('_id', expect.any(String))
        expect(res.body).toHaveProperty('email', userOne.email)
        expect(res.body).toHaveProperty('name', userOne.name)
        expect(res.body).toHaveProperty('phone', userOne.phone)
        done()
      })
  })
})

describe('Delete User / Failed Case', () => {
  test('Failed because of token not provided', (done) => {
    request(app)
      .delete(`/users/${userOneId}`)
      .end((err, res) => {
        if (err) throw err
        const errors = ['Authentication failed']
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })

  test('Failed because of invalid token', (done) => {
    request(app)
      .delete(`/users/${userOneId}`)
      .set('access_token', 'token')
      .end((err, res) => {
        if (err) throw err
        const errors = ['Authentication failed']
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })

  test('Failed because of user not found', (done) => {
    request(app)
      .delete(`/users/${new mongoose.Types.ObjectId()}`)
      .set('access_token', userOneToken)
      .end((err, res) => {
        if (err) throw err
        const errors = ['User not found']
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })

  test('Failed because of id is invalid', (done) => {
    request(app)
      .delete('/users/123')
      .set('access_token', userOneToken)
      .end((err, res) => {
        if (err) throw err
        const errors = ['User not found']
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('errors', expect.any(Array))
        expect(res.body.errors).toEqual(errors)
        done()
      })
  })
})
