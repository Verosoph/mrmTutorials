//include module
const express = require('express')
const path = require('path');
const logger = require('./middelware/logger');

// init express
const app = express();



app.use(logger);

// BodyParser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false})) // its to handle post with form data

// Members Api Routes
app.use('/api/members', require('./routes/api/members'));

//Create the endpoints/route handlers
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'start.html'));
});

// Listen on a port (more beautiful)
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
