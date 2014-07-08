/* global app:true */
'use strict';

var app = angular.module('barkApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase'
  ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/dogs.html',
      controller: 'DogsCtrl'
    })
    .when('/dogs/:dogId', {
      templateUrl: 'views/dogshow.html',
      controller: 'DogViewCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.constant('FIREBASE_URL', 'https://glowing-fire-7606.firebaseio.com/');