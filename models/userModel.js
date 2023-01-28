const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please give your name']
    },
    email: {
        type: String,
        required: [true, 'Please give your email'],
        unique: true,
        lowercase: true,
        // to validate email
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 8,
        select: false //it wont be selected in any queries except using + operator
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        // custom validation
        validate: {
            validator: function (el) {
                return el === this.password; // el --> confirmPassword
            },
            message: 'Passwords are not same',
        },
    },
    passwordChangedAt: {
        type: Date,
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;