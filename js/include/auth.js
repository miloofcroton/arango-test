const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./../include/config');

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.jwt_secret,
  };
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.expiration <= Date.now()) {
      return done(null, false, {msg: 'Token expired.'});
    }
    else {
      return done(null, jwt_payload);
    }
  }));
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', { session: false});
    },
    getToken: (headers) => {
      if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
          return parted[1];
        }
        else {
          return null;
        }
      }
      else {
        return null;
      }
    }
  };
};
