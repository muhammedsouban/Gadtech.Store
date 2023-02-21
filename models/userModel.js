const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Address: [{
        Name: { type: String, required: true },
        Number: { type: String, required: true },
        City: { type: String, required: true },
        State: { type: String, required: true },
        Country: { type: String, required: true },
        Pincode: { type: String, required: true },
        address: { type: String, required: true },
    }],
    Cart: {
        type: Array
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: 0
    },
    token: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('User', userSchema);