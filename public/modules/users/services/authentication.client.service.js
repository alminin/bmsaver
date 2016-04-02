/**
 * Created by Alminin on 29.03.2016.
 */
'use strict'

// Authentication service for user variable
angular.module('users')

    .factory('Authentication', [
    function() {
        var self = this;

        self._data = {
            user: window.user
        }

        return self._data;
    }
]);