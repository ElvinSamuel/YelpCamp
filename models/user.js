var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Adds additional methods to our schema that we can use.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);