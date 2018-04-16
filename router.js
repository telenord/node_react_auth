const Auth = require('./controllers/auth') ;


module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send(['asd', 'wer', 'rsthsrt'])
  });

  app.post('/signup', Auth.signup);

};