const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    date:{type: Date, default: Date.now},
})

module.exports = USER = mongoose.model('users', userSchema)