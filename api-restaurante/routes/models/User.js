// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    activate: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('users', userSchema);
