const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email : { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Apply uniqueValidator to user Schema before to export it
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique ! Email account already used !'});

module.exports = mongoose.model('User', userSchema);