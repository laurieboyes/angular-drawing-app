'use strict';

/* Directives */

angular.module('myApp.directives', [])

    .directive('canvas', ['raphael', function(raphael) {
        return {
            restrict: 'A',
            link: function(scope, elements, attrs) {
                raphael.makeCanvas(elements[0], attrs.canvasWidth, attrs.canvasHeight);
            }
        }
    }]);