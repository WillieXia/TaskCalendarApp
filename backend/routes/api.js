const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const jwt = require('jsonwebtoken')
const router = express.Router()

const UserModel = require('../models/User')

router.post('/login', async (req, res) => {
  try { 
    // Find user by email
    const user = await UserModel.findOne({ email: req.body.email.toLowerCase() })
    if (!user) {
      req.session.error = 'User with that email does not exist. Create an account!'
      return res.redirect('/')
    }
    // Passwords match
    if (user.password == req.body.password) {
      const token = jwt.sign({
        "sub": user._id
      }, process.env.TOKEN_SECRET);
      res.cookie('access_token', token);
      return res.redirect('/home')
    // Passwords don't match
    } else {
      req.session.error = 'Wrong password!'
      return res.redirect('/')
    }
  } catch(err) {
    console.log(err)
    return res.redirect('/')
  }
}) 

router.post('/signup', async (req, res) => {
  // Check passwords match
  if (req.body.password != req.body.confirmPassword) {
    req.session.error = 'Passwords dont match!'
    return res.redirect('/')
  }
  // Check user does not already exist
  const user = await UserModel.findOne({ email: req.body.email.toLowerCase() })
  console.log(user)
  if (user) {
    req.session.error = 'User with that email already exists!'
    return res.redirect('/')
  }
  // Try to create account
  try {
    const newUser = new UserModel({
      email: req.body.email.toLowerCase(),
      name: req.body.name,
      password: req.body.password,
    })
    await newUser.save()
    const token = jwt.sign({
      "sub": newUser._id
    }, process.env.TOKEN_SECRET);
    res.cookie('access_token', token);
    return res.redirect('/home')
  // Catch any errors
  } catch(err) {
    console.log(err)
    req.session.error = 'Sorry! We couldn\'t sign you up, please try again!'
    return res.redirect('/')
  }
}) 

router.post('/logout', (req, res) => {
  res.cookie('access_token', '');
  res.redirect('/')
}) 

router.post('/class', (req, res) => {
  if (!req.isAuthenticated) {
    return res.redirect('/')
  }
  // TODO: create class
}) 

router.post('/task', (req, res) => {
  if (!req.isAuthenticated) {
    return res.redirect('/')
  }
  // TODO: create task
}) 

module.exports = router