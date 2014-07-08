'use strict';

app.factory('Dog',
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'dogs');
    var dogs = $firebase(ref);

    var Dog = {
      all: dogs,
      create: function(dog) {
        return dogs.$add(dog);
      },
      find: function(dogId) {
        return dogs.$child(dogId);
      },
      delete: function(dogId) {
        return dogs.$remove(dogId);
      }
    };

    return Dog;
  });