const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { nextTick } = require('process');

const userSchema = new mongoose.Schema({
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
        select: false,
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

// Hashing password and storing it in db

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    // we should not save pwd confirm in db
    this.passwordConfirm = undefined;
    next();
});

// to check whether pwd is correct or not

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model('User',userSchema);

module.exports = User;