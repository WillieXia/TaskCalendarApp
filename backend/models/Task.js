const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  // TODO: implement schema
});

module.exports = mongoose.model('tasks', taskSchema)