const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const BlogSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  dir: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
      type: String,
      required: true
  },
  created_on: {
    type: Date,
    default: Date.now
  }
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog