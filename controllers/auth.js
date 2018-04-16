const User = require('../models/user');
const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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
      res.json(dbUser);
    });

  });
};