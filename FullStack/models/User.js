const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(32).required(),
        email: Joi.string().min(5).max(32).required().email(),
        password: Joi.string().min(5).max(32).required(),
    }
    return Joi.validate(user, schema);
}

exports.User = mongoose.model('users', UserSchema);
exports.validate = validateUser;