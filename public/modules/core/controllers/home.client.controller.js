/**
 * Created by Alminin on 02.04.2016.
 */
'use strict';

angular.module('core')
.controller('HomeCtrl', ['$scope', 'Authentication',
    function($scope, Authentication){
        // This provides Authenticanion context
        $scope.authentication = Authentication;
    }
 ]);