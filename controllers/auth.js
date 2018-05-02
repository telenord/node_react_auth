const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timeStamp}, config.secret)
}

exports.signup = (req, res, next) => {

  const {email, password} = req.body;

  User.findOne({email: email}, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({error: 'Email in use'})
    }

    const user = new User({email, password});

    user.save((err, dbUser) => {
      if (err) {
        return next(err);
      }
      res.json({token: tokenForUser(user)});
    });

  });
};