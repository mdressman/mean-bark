'use strict';

var app = angular.module('barkApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'btford.socket-io',
  'ui.router'
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

window.onLoadCallback = function() {
  angular.element(document).ready(function() {
    gapi.client.load('oauth2', 'v2', function() {
      angular.bootstrap(
        document,
        ['barkApp']
      );
    });
  });
}