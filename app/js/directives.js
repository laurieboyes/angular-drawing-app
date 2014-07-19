'use strict';

/* Directives */

angular.module('myApp.directives', []).

    directive('canvas', [function() {
        return {
            restrict: 'A',
            link: function(scope, elements, attrs) {
                var paper = Raphael(elements[0], attrs.canvasWidth, attrs.canvasHeight);
                var background = paper.rect(0, 0, attrs.canvasWidth, attrs.canvasHeight);
                background.attr("fill", "#FFF");
                background.attr("stroke", "#000");
            }
        }
    }]);