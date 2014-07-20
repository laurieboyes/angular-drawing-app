'use strict';

/* Directives */

angular.module('myApp.directives', [])

    .directive('canvas', ['drawing', function (drawing) {
        return {
            restrict: 'A',
            link: function (scope, elements, attrs) {
                var w = attrs.canvasWidth;
                var h = attrs.canvasHeight;
                var canvasElement = elements[0];

                var paper = Raphael(canvasElement, w, h);

                //background
                var background = paper.rect(0, 0, w, h)
                    .attr("fill", "#FFF")
                    .attr("stroke", "#000");

                //events
                background.drag(
                    function onMove(dx, dy, x, y, e) {

                        //bit of a nasty hack to ensure we're still on the canvas
                        if ($(elements).find(e.target).length > 0) {
                            drawing.continuePath(paper, e.offsetX, e.offsetY);
                        } else {
                            drawing.endPath();
                        }
                    }
                    ,
                    function onStart(x, y, e) {
                        drawing.startPath(paper, e.offsetX, e.offsetY);
                    },
                    function onEnd() {
                        drawing.endPath();
                    }
                );

            }
        }
    }]);