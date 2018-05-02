const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});

// hook before saving usermodel this function run
userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt)=>{
    if(err) {return next(err);}

    bcrypt.hash(user.passsword, salt, null, (err, hash)=>{
      if(err) {return next(err);}
      user.passsword = hash;

      next();
    });
  });
});

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;