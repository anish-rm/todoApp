const path = require('path');
const express = require('express');
// const cors = require('cors');

const app = express();
const todoRouter = require('./routes/todoRoutes');
const userRouter = require('./routes/userRoutes');


// to access static folders 
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(`${__dirname}/public`));


// app.use(cors());

// LIMITING REQUESTS
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/todos',todoRouter);
app.use('/api/v1/users',userRouter);


module.exports = app;