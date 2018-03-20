var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var Values = require('../models/values');
/* GET home page. */
router.get('/', function(req, res) {

  res.render('login');

});
router.post('/', function(req, res, next) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;
    if (user) {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          req.session.userId = user._id;
          next();
        } else {
          req.session.flash = {
            type: 'danger',
            intro: 'Validation error!',
            message: 'Wrong password!',
          };
          res.redirect(303, '/login');


        }
      });
    } else {
      req.session.flash = {
        type: 'danger',
        intro: 'Validation error!',
        message: 'Unable to find this username!',
      };
      res.redirect(303, '/login');
    }


  });


});
router.use('/', function(req, res) {
  var viewModel = {
    values: []

  };
  Values.find({}, {}, function(err, values) {
    if (err) {
      throw err;
    }

    viewModel.values = values;
    viewModel.user = req.body.username;


    res.render('welcome', viewModel);
  });


});


module.exports = router;
