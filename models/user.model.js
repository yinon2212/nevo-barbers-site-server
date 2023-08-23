const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: 'string',
    phone: 'string',
    hour: 'string'
});

const User = mongoose.model('User',userSchema);

module.exports = User;