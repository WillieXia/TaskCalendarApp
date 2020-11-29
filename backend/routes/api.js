const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const jwt = require('jsonwebtoken')
const router = express.Router()

const UserModel = require('../models/User')
const ClassModel = require('../models/Class')
const TaskModel = require('../models/Task')

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

router.post('/class', verifyToken, async (req, res) => {
  if (!req.isAuthenticated) {
    return res.sendStatus(401)
  }
  try {
    const newClass = new ClassModel({
      name: req.body.name,
      user_id: req.user._id
    })
    await newClass.save()
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
}) 

router.post('/task', verifyToken, async (req, res) => {
  if (!req.isAuthenticated) {
    return res.sendStatus(401)
  }
  try {
    const newTask = new TaskModel({
      text: req.body.text,
      class_id: req.body.class_id
    })
    await newTask.save()
    res.sendStatus(201)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
}) 

router.get('/allClassesWithTasks', verifyToken, async (req, res) => {
  if (!req.isAuthenticated) {
    return res.sendStatus(401)
  }
  try {
    let classes = await ClassModel.find({ user_id: req.user._id })
    for (let i = 0; i < classes.length; i++) {
      classes[i] = classes[i].toObject()
      classes[i].tasks = await TaskModel.find({ class_id: classes[i]._id })
    }
    res.json(classes)
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router