/**
 * Created by Alminin on 30.03.2016.
 */
'use strict'

angular.module('users').factory('Users', ['$resource',
    function($resource) {
        return $resource('users', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
]);