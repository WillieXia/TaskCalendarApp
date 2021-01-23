const express = require('express');

const router = express.Router();

// Get the user's tasks
router.get('/', (req, res) => {

})

// Get detailed info on specific task
router.get('/:taskId', (req, res) => {

})

// Create a new task
router.post('/create', (req, res) => {

})

// Delete task
router.delete('/:taskId', (req, res) => {
  
})

module.exports = router