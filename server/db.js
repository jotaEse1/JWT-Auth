const mongoose = require('mongoose');

//schemas
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String
})

//models
const User = mongoose.model('User', userSchema)

module.exports = {User}

