'use strict';

/* Directives */

angular.module('myApp.directives', [])

    .directive('canvas', [function () {
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

                var pathStringInProgress = "";
                var pathInProgress;

                //events
                background.drag(
                    function onMove (dx, dy, x, y, e) {

                        //bit of a nasty hack to ensure we're on the canvas
                        if ($(elements).find(e.target).length <= 0){
//                          pathStringInProgress = "";
                            return;
                        }

                        // continue path
                        if(pathStringInProgress.length){
                            pathStringInProgress += "L" + e.offsetX + "," + e.offsetY;
                            pathInProgress.remove();
                            pathInProgress = paper.path(pathStringInProgress);
                        }
                    }
                    ,
                    function onStart(x, y, e) {
                        // start path
                        pathStringInProgress = "M" + e.offsetX + "," + e.offsetY;
                        pathInProgress = paper.path(pathStringInProgress);
                    },
                    function onEnd() {
                        // end path
                        pathStringInProgress = "";
                    }
                );

            }
        }
    }]);