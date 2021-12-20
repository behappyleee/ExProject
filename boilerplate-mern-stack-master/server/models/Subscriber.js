const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
    userTo : {
        type: Schema.Types.ObjectId,
        ref: 'User', 

    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref:'User',
    }

}, {timestamp: true})

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }