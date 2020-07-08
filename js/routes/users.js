const express = require('express');
const apiRoutes = express.Router();
const bcrypt = require('bcryptjs');
const config = require('./../include/config.js');
const jwt = require('jwt-simple');

// connect to database
const Database  = require('arangojs').Database;
const db = new Database(config.db_location);
db.useDatabase(config.db_name);
db.useBasicAuth(config.db_user, config.db_pw);

// include passport
const passport	= require('passport');
const auth = require('./../include/auth.js')(passport);
apiRoutes.use(auth.initialize());

// create a new user account (POST /api/users/register)
apiRoutes.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      msg: 'Please pass username and password.'
    });
  }
  else {
    doc = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    };
    (async () => {

      try {
        const cursor = await db.query('FOR x IN users FILTER x.username=="' + doc.username + '" RETURN "true"');
        const result = await cursor.next();

        // if username is available create new user
        if (!result){
          await db.collection('users').save(doc);
          res.json({
            success: true,
            msg: 'Successful created new user'
          });
        }
        else {
          res.json({
            success: false,
            msg: 'Username already exists.'
          })
        }
      }
      catch (err) {
        res.send({
          success: false,
          // err,
          msg: 'Registration failed.'
        });
      }
    })();
  }
});

// route to authenticate a user (POST /api/users/authenticate)
apiRoutes.post('/authenticate', (req, res) => {
  if (req.body.username && req.body.password) {
    (async ()=>{
      try {
        const cursor = await db.query('FOR x IN users FILTER x.username=="'+req.body.username+'" RETURN {username: x.username, password:x.password}');
        const result = await cursor.next();
        // if user is found and password is correct return a token with payload
        if (result && bcrypt.compareSync(req.body.password, result['password'])){
          const payload = {
            username: result['username'],
            expiration: Date.now() + 1000 * 60 * 60 * 48 //48 hours
          }
          const token = jwt.encode(payload, config.jwt_secret);
          res.json({
            success: true,
            token: 'JWT ' + token, payload: payload
          });
        }
        else {
          res.send({
            success: false,
            msg: 'Authentication failed.'
          });
        }
      }
      catch (err) {
        res.send({
          success: false,
          msg: 'Authentication failed.'
        });
      }
    })();
  }
  else {
      res.send({
        success: false,
        msg: 'Authentication failed.'
      });
  }
});

// route to a restricted info (GET /api/users/memberinfo)
apiRoutes.get('/memberinfo', auth.authenticate(), (req, res) => {
  const decoded = jwt.decode(auth.getToken(req.headers), config.jwt_secret);
  if (decoded) {
    db.query('FOR x IN users FILTER x.username=="'+decoded.username+'" RETURN x', (err, user, fields) => {
      if (err) throw err;
  		else if (user['_result'][0]){
        res.json({
          success: true,
          msg: 'Welcome in the member area, this is your data:', data: user['_result'][0]
        });
      }
      else {
        return res.send({
          success: false,
          msg: 'Authentication failed. User not found.'
        });
  		}
    });
  }
  else {
    return res.send({
      success: false,
      msg: 'No token provided.'
    });
  }
});

module.exports = apiRoutes;
