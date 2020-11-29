const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true
  },
  class_id: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('tasks', taskSchema)