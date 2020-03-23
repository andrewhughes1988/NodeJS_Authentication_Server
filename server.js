require('dotenv').config();
const express = require('express');
const register = require('./register');
const login = require('./login');
const mongoose = require('mongoose');
const User = require('./models/User.model');


const mongoURI = process.env.MONGO_DB_URI;
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/register', register);
app.use('/login', login);

app.get('/users', (req, res) => {
    User.find((error, result) => {
        res.json(result);
    });
});


mongoose.connect(mongoURI, { 
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => { console.log('MongoDB connected successfully')})
    .catch((error) => console.log(error));

console.log(`Listening on ${port}`);
app.listen(port);