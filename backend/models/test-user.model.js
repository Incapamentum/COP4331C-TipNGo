const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    userID: {
        type: String,
        required: true
    },
    stripeAccountID: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', User);