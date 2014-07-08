/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Dog = require('../api/dog/dog.model');

Dog.find({}).remove(function() {
  Dog.create({
    name : 'Meiko',
    owner : 'Mauri and Matt',
    image : 'meikoface.com'
  }, {
    name : 'Harley',
    owner : 'Laura and Joe',
    image : 'harleypants.com'
  });
});