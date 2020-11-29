const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

router.get('/', verifyToken, (req, res) => {
  if (!req.isAuthenticated) {
    const message = {
      error: req.session.error
    }
    req.session.error = ''
    return res.render('index.ejs', message)
  }
  res.redirect('/home')
})

router.get('/home', verifyToken, (req, res) => {
  if (!req.isAuthenticated) {
    return res.redirect('/')
  }
  res.render('home.ejs', {user: req.user})
})

module.exports = router