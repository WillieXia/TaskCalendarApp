const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true 
  }
});

module.exports = mongoose.model('classes', taskSchema)