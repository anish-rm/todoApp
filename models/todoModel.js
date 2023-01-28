const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        name: {
            type: 'String',
            required: [true,'A todo must have a name']
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Todo must belong to a user']
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;