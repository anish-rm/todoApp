const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};

exports.createTodo = async (req, res) => {
    try{
        const newTodo = await Todo.create(req.body);
        res.status(200).json({
            status: 'success'
        });
    } catch(err){
        res.status(400).json({
            status: 'error',
            message: err
        });
    }
   
};