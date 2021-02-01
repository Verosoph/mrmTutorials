# MEAN
## Quelle
 - https://www.youtube.com/watch?v=uONz0lEWft0&list=RDCMUC29ju8bIPH5as8OGnQzwJyA&start_radio=1&t=38&ab_channel=TraversyMedia
 


## Environment
```
npm init
```
package.json 1.0
```javascript
{
  "name": "meanauth",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app"
  },
  "dependencies": {
    "express":"*",
    "mongoose":"*",
    "bcryptjs":"*",
    "cors":"*",
    "jsonwebtoken": "8.5.1",
    "passwort":"*",
    "passport-jwt":"*"

  },
  "author": "Marco Mettke",
  "license": "ISC"
}
```
```
npm install
```
### Cors Module
Erlaubt die Anfrage an die Api von unterschiedlichen domains
- https://enable-cors.org/server_expressjs.html
- https://www.npmjs.com/package/cors
### Path Module
Erlaubt zugriff auf Dateistrucktur auf Server
### Passport Module
### Bcryptjs
- https://www.npmjs.com/package/bcryptjs

### Mongoose Module
Regelt Datenbankconnection zu MongoDB
- https://mongoosejs.com/docs/connections.html
---

app.js 1.0
```javascript
// include modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//init express
const app = express();

// create a port
const port = 3000;

// simple test route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})


// listen to a port
app.listen(port, () => {
    console.log ('Server started on port: '+port);
});
```
Nodemon installieren 
```
npm install -D nodemon
```
package.json 1.1
```javascript
{
  "name": "meanauth",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "*",
    "mongoose": "*",
    "bcryptjs": "*",
    "cors": "*",
    "jsonwebtoken": "8.5.1",
    "passport": "*",
    "passport-jwt": "*"
  },
  "author": "Marco Mettke",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
```
## Routen erstellen
* File users.js erstellen in "routes"-Verzeichnis  

/routes/user.js 1.0
```javascript
const express = require('express');
const router = express.Router();

// Register
router.post('/register', (req, res, next) => {
    res.send('REGISTER');
});

// Authendicate
router.post('/authendicate', (req, res, next) => {
    res.send('AUTHENDICATION');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

// Validate
router.get('/validate', (req, res, next) => {
    res.send('VALIDATION');
});

module.exports = router;
```
app.js 2.0
```javascript
// include modules
const express = require('express');
const path = require('path');
// CorsMiddleware allows to make a request to the api from a diverent domain name
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// include project files
const users = require('./routes/users');

//init express
const app = express();

// create a port
const port = 3000;

// Middleware
// CorsMiddleware
app.use(cors());

//Body Parser
app.use(express.json());

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
```
routes sollten nun erreichbar sein über:
- localhost:3000/users/register
- localhost:3000/users/profile
- localhost:3000/users/authendicate
- localhost:3000/users/validation

## Statisches Verzsichnis anlegen
Das Module path ermöglicht des zugreifen auf die Verzeichnisstruktur des Servers. 
Verzeichnis soll hier "public" heißen und wird wie folgt als das statische Vereichnis in express gekennzeichnet.
 - "___dirname" - gibt aktuelles Verzeichnis zurück
 - path ist das module was in express.static verwendet wird.
```javascript
app.use(express.static(path.join(__dirname, 'public')));
```

## Datenbank Verbindung
Es wird das Module mongoose verwendet für die Verbindung zur Datenbank.
Dazu wird ein neues Verzeichnis "config" erstellt und darin das File database.js in dem die Verbindungsdaten stehen.

/config/database.js 1.0
```javascript
module.exports = {
    database: 'mongodb://localhost:27017/meanauth',
    secret: 'password',
    options: {
        //https://mongoosejs.com/docs/connections.html
        useUnifiedTopology: true,   
        useNewUrlParser: true,
    }
}
```
app.js 2.1
```javascript
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
} catch {
    (error) => {
        handleError(error);
}}
// info database connection works
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});
// show database error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

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
```

## Models
Man erstellt zunächst ein Model mit einem Schema für den User.
/models/User.js
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user Schema
const UserSchema = mongoose.Schema({
    name: {
        type : String
    },
    email: {
        type : String,
        required: true
    },
    username: {
        type : String,
        required: true
    },
    password: {
        type : String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username : username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    console.log('Status db connection: ' + mongoose.connection.readyState);
    
     bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
                console.log('error')};
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
```
Und ändert dann die route users entsprechend:
/route/users.js
```javascript
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const user = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    })

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({ success: false, msg: 'Failed to register user'});        
        } else {
            res.json({success: true, msg:'user registered'});
        }
    });
});


// Authendicate
router.post('/authendicate', (req, res, next) => {
    res.send('AUTHENDICATION');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;
```
Zum testen kann man dann postman verwenden:
- POST request
    - http://localhost:3000/users/register
- Headers
    - content-type - application/json
- Body
    - raw
```
{
    "name": "jonDoe",
    "email": "jon@email.com",
    "username": "jon",
    "password": "secret"
}
```