const User = require('../models/userModel')
const { verifyToken } = require('../helpers/jwt')

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers
    let decoded = verifyToken(access_token)
    const user = await User.findById(decoded.id).select('-password')
    console.log(user)
    if (!user) throw { name: 'AuthenticationFailed' }
    req.userData = decoded
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication
