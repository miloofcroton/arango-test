const express = require('express');
const app = express();
const helmet = require("helmet");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 4000;
const users = require('./routes/users');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// use security middleware
app.use(helmet());

// initial view (GET /)
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

 // all api views (ALL /api/*)
app.all('/api/*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*'); //set allowed origin or wildcard '*'
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method=='OPTIONS') return res.sendStatus(200);
  next();
});

// initial api view (GET /api/)
app.get('/api/', function(req, res) {
  res.send('Hello! This is the API at http://localhost:' + port + '/api');
});

// connect the api routes under /api/*
app.use('/api/users', users);

// start the server
app.listen(port, () => {
    console.log('My API is running on http://localhost:' + port);
});
