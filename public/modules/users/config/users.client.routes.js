/**
 * Created by Alminin on 02.04.2016.
 */
'use strict';

angular.module('users').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'modules/users/views/signup.client.view.html'
            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'modules/users/views/signin.client.view.html'
            });
    }
]);