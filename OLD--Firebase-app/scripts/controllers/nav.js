'use strict';

app.controller('NavCtrl', function($scope, $location, Dog) {

  $scope.dog = { name: '', owner: '', image: 'http://' };

  $scope.submitDog = function () {
    Dog.create($scope.dog).then(function (ref) {
      $location.path('/dogs/' + ref.name());
      $scope.dog = { name: '', owner: '', image: 'http://' };
    });
  };

});