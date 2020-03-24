/* LOAD MODULES */
require('dotenv').config();
const express = require('express');
const register = require('./register');
const token = require('./token');
const login = require('./login');
const logout = require('./logout');
const mongoose = require('mongoose');

/* CONFIGURE */
const mongoURI = process.env.MONGO_DB_URI;
const app = express();
const port = process.env.PORT || 23456;
app.use(express.json());

/* ROUTES */
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/token', token);

/* CONNECT DATABASE */
mongoose.connect(mongoURI, { 
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.log(error));

/* START SERVER */
console.log(`Listening on ${port}`);
app.listen(port);