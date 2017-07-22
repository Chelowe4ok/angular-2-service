// Get dependencies

const express = require('express');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let pool = require('./server/db/database.js');
let MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser(
    'keyboard-cat'
));

let sessionStore = new MySQLStore({}, pool);

let sess = {
    secret: 'keyboard-cat',
    resave: true,
    cookie: {
        expires: new Date(Date.now() + 3600000),
        maxAge: 3600000
    },
    store: sessionStore,
    resave: true,
    httpOnly: true,
    saveUninitialized: true
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
} else {
    sess.cookie.secure = false;
}

app.use(session(sess));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes 
app.use('/api', api);




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = sess;