var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
/* GET home page. */
router.get('/', function(req, res) {

  res.render('login');
});
router.post('/', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;
    if (user) {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          res.send('Complimenti ti sei loggato');
        } else {
          res.send('La pasword inserita non è corretta');
        }
      });
    } else {
      res.send('utente non presente nel database')
    }


  });


});

module.exports = router;
