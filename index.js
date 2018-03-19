var app = require('./app');

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');


var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
