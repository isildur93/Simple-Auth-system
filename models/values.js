var mongoose = require('mongoose');
var values = mongoose.Schema({
temperature: Number,
umidity: Number,
light: Number,

});

var Values = mongoose.model('Values', values);
module.exports = Values;
