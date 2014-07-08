'use strict';

app.controller('DogViewCtrl', function ($scope, $routeParams, Dog) {
  $scope.dog = Dog.find($routeParams.dogId);
});