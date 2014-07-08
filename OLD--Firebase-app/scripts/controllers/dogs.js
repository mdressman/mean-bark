'use strict';

app.controller('DogsCtrl', function($scope, $location, Dog) {
  $scope.dogs = Dog.all;

  $scope.dog = { name: '', owner: '', image: 'http://' };

  $scope.deleteDog = function (dogId) {
    Dog.delete(dogId);
  };

});