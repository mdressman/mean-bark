'use strict';

app.controller('DogsCtrl', function ($scope, $http, socket, $modal) {
    $scope.dogs = [];

    $scope.dog = { name: '', owner: '', image: 'http://' };

    $scope.signedIn = function(oauth) {
      UserService.setCurrentUser(oauth)
      .then(function(user) {
        $scope.user = user;
      });
    }

    $http.get('/api/dogs').success(function(dogs) {
      $scope.dogs = dogs;
      socket.syncUpdates('dog', $scope.dogs);
    });

    $scope.addDog = function() {
      if($scope.dog === '') {
        return;
      }
      $http.post('/api/dogs', { name: $scope.dog.name,
                                owner: $scope.dog.owner,
                                image: $scope.dog.image,
                              });
      $scope.dog = '';
    };

    $scope.deleteDog = function(dog) {
      $http.delete('/api/dogs/' + dog._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('dog');
    });

    $scope.openLightbox = function(dog) {
      var modalInstance = $modal.open({
        template: '<h2>{{dog.name}}</h2><p>Parents: {{dog.owner}}</p>',
        controller: DogBoxCtrl,
        resolve: {
          dog: function() {
            return dog;
          }
        }
      });
    };
  });

var DogBoxCtrl = function ($scope, $modalInstance, dog) {

  $scope.dog = dog;

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

app.directive('googleSignin', function() {
  return {
    restrict: 'A',
    template: '<span id="signinButton"></span>',
    replace: true,
    scope: {
      afterSignin: '&'
    },
    link: function(scope, ele, attrs) {
      // Set standard google class
      attrs.$set('class', 'g-signin');
      // Set the clientid
      attrs.$set('data-clientid', 
          attrs.clientId+'.apps.googleusercontent.com');
      // build scope urls
      var scopes = attrs.scopes || [
        'auth/plus.login', 
        'auth/userinfo.email'
      ];
      var scopeUrls = [];
      for (var i = 0; i < scopes.length; i++) {
        scopeUrls.push('https://www.googleapis.com/' + scopes[i]);
      };

      // Create a custom callback method
      var callbackId = "_googleSigninCallback",
          directiveScope = scope;
      window[callbackId] = function() {
        var oauth = arguments[0];
        directiveScope.afterSignin({oauth: oauth});
        window[callbackId] = null;
      };

      // Set standard google signin button settings
      attrs.$set('data-callback', callbackId);
      attrs.$set('data-cookiepolicy', 'single_host_origin');
      attrs.$set('data-requestvisibleactions', 'http://schemas.google.com/AddActivity')
      attrs.$set('data-scope', scopeUrls.join(' '));

      // Finally, reload the client library to 
      // force the button to be painted in the browser
      (function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    }
  }
});

app.factory('UserService', function($q, $http) {
  var service = {
    _user: null,
    setCurrentUser: function(u) {
      if (u && !u.error) {
        service._user = u;
        return service.currentUser();
      } else {
        var d = $q.defer();
        d.reject(u.error);
        return d.promise;
      }
    },
    currentUser: function() {
      var d = $q.defer();
      if (service._user) {
        d.resolve(service._user);
      } else {
        gapi.client.oauth2.userinfo.get()
        .execute(function(e) {
          service._user = e;
        })
      }

      return d.promise;
    }
  };
  return service;
});