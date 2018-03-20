var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
/* GET home page. */
router.get('/', function(req, res) {

  res.render('signup');
});
router.post('/', function(req, res) {
  var testUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  User.findOne({
    username: testUser.username
  }, function(err, user) {
    if (user) {
      req.session.flash = {
        type: 'danger',
        intro: 'Validation error!',
        message: 'This username is already taken.',
      };
      res.redirect(303, '/signup');
    } else {
      testUser.save();
      res.send('user created');
    }
  });






});

module.exports = router;
