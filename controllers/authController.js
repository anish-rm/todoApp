const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            photo: req.body.photo,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt
        });
    
        const token = jwt.sign( { id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        newUser.password = undefined;
    
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser,
            },
        });
    } catch(err) {
        res.status(400).json({
            status: 'error',
            message: err,
        });
    }
};