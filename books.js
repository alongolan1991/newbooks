var mongoose = require('mongoose');

var book = new mongoose.Schema({
  id: {type:Number},
  name:{type:String},
  num_of_pages:{type:Number},
  price:{type:Number}
});

module.exports = book;
