const jwt = require('jsonwebtoken')

const UserModel = require('../models/User')

module.exports = async (req, res, next) => {
  req.isAuthenticated = false
  req.user = null
  try {
    if (req.cookies) {
      const token = req.cookies.access_token
      if (!token) return next()
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET)
      if (decoded) {
        const user = await UserModel.findById(decoded.sub)
        if (user) {
          req.isAuthenticated = true
          req.user = user
        }
      }
    }
    next()
  } catch (err) {
    console.log(err)
    next()
  }
}