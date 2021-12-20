const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const disLikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref : 'User',

    },
    commentId : {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
    videoId : {
        type: Schema.Types.ObjectId,
        ref: 'Video',
    }

}, {timestamp: true})

const Dislike = mongoose.model('Dislike', disLikeSchema);

module.exports = { Dislike }