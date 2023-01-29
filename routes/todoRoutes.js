const express = require('express');
const app = require('../app');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.route('/')
    .get(todoController.getTodos)
    .post(todoController.createTodo);

module.exports = router;