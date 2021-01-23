const express = require('express');

const router = express.Router();

// Get the user's lists (excluding tasks)
router.get('/', (req, res) => {

})

// Get tasks from a specific list
router.get('/:listId/tasks', (req, res) => {

})

// Create a new list
router.post('/create', (req, res) => {

})

// Delete list
router.delete('/:listId', (req, res) => {
  
})

module.exports = router;