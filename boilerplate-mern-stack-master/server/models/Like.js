const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const likeSchema = mongoose.Schema({
    useId: {
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

const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }