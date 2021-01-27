const express = require('express');

const router = express.Router();

const Task = require('../models/Task')

// Get the user's tasks
router.get('/', (req, res) => {

})

// Get detailed info on specific task
router.get('/:taskId', (req, res) => {

})

// Create a new task
router.post('/create', (req, res) => {

  const newTask = new Task({
    user: req.session.user,
    list: req.body.listId,
    name: req.body.name,
    numOfCheckpoints: req.body.numOfCheckpoints
  })

  try {
    newTask.save()
  } catch(err) {
    return res.status(400).send({
      error: 'Unnable to create task'
    })
  }

  return res.send({
    msg: 'New task created!',
    task: newTask
  })
})

// Delete task
router.delete('/:taskId', (req, res) => {
  
})

module.exports = router