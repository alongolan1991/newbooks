var mongoose = require('mongoose'),
      book = require('./books');

newbook = new mongoose.Schema({
  libary_name:{type:String},
  books:[book]
  });

var Newbook = mongoose.model('Newbook',newbook);

module.exports = Newbook;
