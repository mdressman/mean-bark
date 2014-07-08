'use strict';

angular.module('barkApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dogs', {
        url: '/',
        templateUrl: 'app/dogs/dogs.html',
        controller: 'DogsCtrl'
      });
  });