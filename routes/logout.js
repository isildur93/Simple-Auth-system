var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
/* GET home page. */
router.get('/', function(req, res) {

  if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
});
module.exports = router;
