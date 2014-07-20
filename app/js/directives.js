'use strict';

/* Directives */

angular.module('myApp.directives', [])

    .directive('canvas', ['drawing','pathDrawing', function (drawing, pathDrawing) {
        return {
            restrict: 'A',
            link: function (scope, elements, attrs) {
                var w = attrs.canvasWidth;
                var h = attrs.canvasHeight;
                var canvasElement = elements[0];

                drawing.paper = Raphael(canvasElement, w, h);
                var paper = drawing.paper;

                //background
                var background = paper.rect(0, 0, w, h)
                    .attr("fill", "#FFF")
                    .attr("stroke", "#000");

                drawing.backgroundElementId = background.id;

                //events
                background.drag(
                    function onMove(dx, dy, x, y, e) {

                        //bit of a nasty hack to ensure we're still on the canvas
                        if ($(elements).find(e.target).length > 0) {
                            pathDrawing.continuePath(e.offsetX, e.offsetY);
                        } else {
                            pathDrawing.endPath();
                        }
                    }
                    ,
                    function onStart(x, y, e) {
                        pathDrawing.startPath(e.offsetX, e.offsetY);
                    },
                    function onEnd() {
                        pathDrawing.endPath();
                    }
                );

            }
        }
    }]);