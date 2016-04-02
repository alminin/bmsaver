/**
 * Created by Alminin on 02.04.2016.
 */
'use strict';

angular.module('users')
    .controller('AuthenticationCtrl', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;
        $scope.credentials = {};

        // If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(res) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = res;

                // And redirect to the index page
                $location.path('/');
            }).error(function(res) {
                $scope.error = res.message;
            });
        };

        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).success(function(res) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = res;

                // And redirect to the index page
                $location.path('/');
            }).error(function(res) {
                $scope.error = res.message;
            });
        };
    }
]);
