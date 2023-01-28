const path = require('path');
const express = require('express');
// const cors = require('cors');

const app = express();

// to access static folders 
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(`${__dirname}/public`));


// app.use(cors());

// LIMITING REQUESTS
app.use(express.json({ limit: '10kb' }));

app.get('/user', (req,res) => {
    res.send("hello");
});

module.exports = app;