/**
 * Created by Alminin on 28.03.2016.
 */
'use strict';

angular.module('core')

.controller('HeaderCtrl', ['$scope','Authentication', function($scope, Authentication){
        $scope.isCollapsed = false;
        $scope.authentication = Authentication;

        $scope.toggleCollapsibleMenu = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = false;
        });
    }
]);