const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  writer : {
      type: Schema.Types.ObjectId,
      ref:'User'
  },
  postId : {
      type:Schema.Types.ObjectId,
      ref:'Video'
  },
  responseTo : {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  content : {
      type: String
  }

}, {timestamp: true})

const Comment = mongoose.model('Comment', subscriberSchema);

module.exports = { Comment }