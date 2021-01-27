const express = require('express');

const checkAuth = require('../middleware/checkAuth')

const List = require('../models/List')
const Task = require('../models/Task')

const router = express.Router();

// Get the user's lists (excluding tasks)
router.get('/', checkAuth, async (req, res) => {
  const lists = await List.find({ creator: req.session.user })
  return res.send({
    lists
  })
})

// Get list data
router.get('/:listId', checkAuth, async (req, res) => {
  const { listId } = req.params
  const list = await List.findById(listId)
  const tasks = await Task.find({ list: listId })
  if (!list) {
    return res.status(400).send({
      error: 'We couldn\'t find that list!' 
    }) 
  }
  return res.send({
    list,
    tasks
  })
})

// Create a new list
router.post('/create', checkAuth, async (req, res) => {

  // Check list empty
  if (!req.body.name) {
    return res.status(400).send({
      error: 'List name cant be empty!'
    })
  }

  // Check is list is dupe
  const list = await List.findOne({
    creator: req.session.user,
    name: req.body.name
  })
  if (list) {
    return res.status(400).send({
      error: `You already have a list called ${req.body.name}!`
    })
  }

  // Create list
  const newList = new List({
    creator: req.session.user,
    name: req.body.name
  })
  try {
    await newList.save()
  } catch(err) {
    console.log(err)
    return res.status(400).send({
      error: 'Unnable to create list'
    })
  }

  return res.send({
    list: newList,
    msg: `${newList.name} was created!`
  })

})

// Delete list
router.delete('/:listId', checkAuth, (req, res) => {

})

module.exports = router;