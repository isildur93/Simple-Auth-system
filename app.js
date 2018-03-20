var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var credentials = require('./credentials.js');
var index = require('./routes/index');
var users = require('./routes/users');
var logout = require('./routes/logout');
var signup = require('./routes/signup');
var session = require('express-session');
var mongoose = require('mongoose');

var MongoStore = require('connect-mongo')(session);
var Values = require('./models/values');
mongoose.connect(credentials.mongooseConnection);
var db = mongoose.connection;
var app = express();
var login = require('./routes/login');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser(credentials.cookieSecret));
app.use(require('express-session')({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use('/static', express.static('public'));
app.use(function(req, res, next) {
  // if there's a flash message, transfer
  // it to the context, then clear it
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});
app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use(function(req, res) {
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





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 500;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
