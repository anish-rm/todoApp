const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    res.status(200).json({
        status: 'success'
    });
};


exports.createUser = async (req, res) => {
    res.status(200).json({
        status: 'success'
    });
};