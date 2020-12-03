const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')
const { generateToken } = require('../../helpers/jwt')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Ramzy Rashaun',
  phone: '08112108544',
  email: 'ramzyrash@gmail.com',
  password: 'test123',
}

userOneToken = generateToken({ id: userOne._id })

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'Maru Rashaun',
  phone: '08112108544',
  email: 'marurash@gmail.com',
  password: 'test123',
}

const setupDatabase = async () => {
  await User.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
}

module.exports = {
  userOneId,
  userOne,
  userOneToken,
  userTwoId,
  userTwo,
  setupDatabase,
}
