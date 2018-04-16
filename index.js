const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const router = require('./router');

const uri = 'mongodb://localhost:27017/auth';
mongoose.connect(uri)
  .then(
    () => {
      console.log('Successfully connected');
    },
    err => {
      console.log(err);
    }
  );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// App setup
app.use(express.json());
app.use(morgan('combined'));
router(app);

// Server setup
const port = process.env.PORT || 3090;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


