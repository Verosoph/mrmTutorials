// include modules
const express = require('express');
const path = require('path');
// CorsMiddleware allows to make a request to the api from a diverent domain name
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// include project files
const users = require('./routes/users');
const config = require('./config/database');

// connection to database
try {
    mongoose.connect(config.database, config.options);
    console.log('Connected to database '+config.database);
} catch {
    (error) => {
        handleError(error);
}}
// info database connection works
//mongoose.connection.on('connected', () => {
    //console.log('Connected to database '+config.database);
//});
// show database error (redundant)
//mongoose.connection.on('error', (err) => {
  //  console.log('Database error '+err);
//});



//init express
const app = express();

// create a port
const port = 3000;

// Middleware
// CorsMiddleware
app.use(cors());

//Body Parser
app.use(express.json());

// set a static path
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', users);

// simple test route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})


// listen to a port
app.listen(port, () => {
    console.log ('Server started on port: '+port);
});




