const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/User')

// Login a user
router.post('/login', async (req, res) => {

  const { email, password } = req.body
  const user = await User.findOne({ email })

  // User doesnt exist
  if (!user) {
    return res.status(401).send({
      error: 'That email does not exist!'
    })
  }

  // Check password match
  const passMatch = await bcrypt.compare(password, user.password)
  if (!passMatch) {
    return res.status(401).send({
      error: 'Incorrect password!'
    })
  }

  // Success, set session and return user
  req.session.user = user.id
  return res.send({
    user,
    msg: "Successfully logged in!"
  })
})

// Sign up a new user
router.post('/signup', async (req, res) => {

  const { name, email, password, confirmPassword } = req.body

  // Check password match
  if (password !== confirmPassword) {
    return res.status(400).send({
      error: 'Passwords do not match!'
    })
  }

  // Check is email alreay exists
  const user = await User.findOne({ email })
  if (user) {
    return res.status(400).send({
      error: 'Email already used! Try logging in.'
    })
  }

  // Create new user
  const hash = await bcrypt.hash(password, 10)
  const newUser = new User({
    name, 
    email,
    password: hash,
  })
  try {
    await newUser.save()
  } catch(err) {
    console.log(err)
    return res.status(400).send({
      error: 'Unnable to create account'
    })
  }
  
  // Success, set session and return user
  req.session.user = newUser.id
  return res.send({
    user: newUser,
    msg: "Account successfully created!"
  })

})

// Logout a user
router.post('/logout', (req, res) => {
  req.session.user = ''
  return res.status(200).send({
    msg: "You were logged out."
  })
})

// Check if user is logged in, return user info
router.get('/status', async (req, res) => {

  // Check is session user exists
  if (!req.session.user) {
    return res.status(200).send({
      signedIn: false
    })
  }

  // Check if user on session exists
  const user = await User.findById(req.session.user)
  if (!user) {
    return res.status(200).send({
      signedIn: false
    })
  }

  // Success, return user
  return res.status(200).send({
    user,
    signedIn: true,
    msg: "Welcome back!"
  })

})

module.exports = router;