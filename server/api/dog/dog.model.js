'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DogSchema = new Schema({
  name: String,
  owner: String,
  image: String
});

module.exports = mongoose.model('Dog', DogSchema);