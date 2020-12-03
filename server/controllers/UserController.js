const User = require('../models/userModel')
const { generateToken } = require('../helpers/jwt')
var ObjectId = require('mongoose').Types.ObjectId

class UserController {
  static async getAllUser(req, res, next) {
    try {
      const users = await User.find({}).select('-password')
      res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params

      if (!ObjectId.isValid(id))
        throw { statusCode: 404, msg: 'User not found' }

      const user = await User.findOneAndDelete({ _id: id }).select('-password')

      if (!user) throw { statusCode: 404, msg: 'User not found' }

      res.send(user)
    } catch (err) {
      next(err)
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { name, phone, email, password } = req.body

      const userExists = await User.findOne({ email })

      if (userExists) throw { statusCode: 400, msg: 'User already exists' }

      const user = await User.create({
        name,
        phone,
        email,
        password,
      })

      const access_token = generateToken({
        id: user._id,
      })

      res.status(201).json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        access_token,
      })
    } catch (err) {
      next(err)
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user || !password || !(await user.matchPassword(password)))
        throw { statusCode: 400, msg: 'Invalid email or password' }

      const access_token = generateToken({
        id: user._id,
      })

      res.status(200).json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        access_token,
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
