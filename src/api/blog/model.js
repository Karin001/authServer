const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const CommentSchema = new Schema({
 message:String,
 like:[String],
 username:String,
 userid:String,
 created_on:Date,
})
const PlurCommentSchema = new Schema({
  main:CommentSchema,
  sub:[CommentSchema]
 })
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
  comments:{
    type:[PlurCommentSchema]
  },
  created_on: {
    type: Date,
    default: Date.now
  }
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog