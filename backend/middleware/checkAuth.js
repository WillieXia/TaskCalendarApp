const User = require('../models/User')

module.exports = async function(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send({
      error: 'You have to be logged in to do that!'
    })
  }
  const user = await User.find({ id: req.session.user })
  if (!user) {
    return res.status(401).send({
      error: 'You have to be logged in to do that!'
    })
  }
  next()
}