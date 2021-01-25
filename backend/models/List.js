const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('List', ListSchema)