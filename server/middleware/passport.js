const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
const { db } = require('../config/mysql');
const passport = require('passport');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'this is my secret';
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    const sql = 'SELECT * FROM `skylight`.`users` WHERE id=?';
    db.query(sql, [jwt_payload.id], async (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user[0]);
      } else {
        return done(null, false);
      }
    });
  })
);
