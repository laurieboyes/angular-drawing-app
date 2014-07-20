'use strict';

/* Directives */

angular.module('myApp.directives', [])

    .directive('canvas', ['drawing','pathDrawing','toolSelection', function (drawing, pathDrawing, toolSelection) {
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

                //foreground for pen drawing
                var drawingSurface = paper.rect(0, 0, w, h).attr("fill", "#000").attr("fill-opacity", 0).
                    drag(
                    function onMove(dx, dy, x, y, e) {
                        switch (toolSelection.selectedTool.id) {
                            case "pen":
                                //bit of a nasty hack to ensure we're still on the canvas
                                if ($(elements).find(e.target).length > 0) {
                                    pathDrawing.continuePath(e.offsetX, e.offsetY);
                                } else {
                                    pathDrawing.endPath();
                                }
                                break;
                        }
                    }
                    ,
                    function onStart(x, y, e) {
                        switch(toolSelection.selectedTool.id) {
                            case "pen":
                                pathDrawing.startPath(e.offsetX, e.offsetY);
                                break;
                        }
                    },
                    function onEnd() {
                        switch(toolSelection.selectedTool.id) {
                            case "pen":
                                pathDrawing.endPath();
                                drawingSurface.toFront();
                                break;
                        }
                    }
                );

                drawing.backgroundElementId = background.id;
                drawing.drawingSurfaceElementId = drawingSurface.id;
            }
        }
    }]);