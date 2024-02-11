const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //the user schema field here

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

});

const User = mongoose.model('User', userSchema);

module.exports = User;