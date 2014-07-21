'use strict';

/* Directives */

angular.module('myApp.directives', [])

    .directive('canvas', ['drawing','pathDrawing','controlsState', function (drawing, pathDrawing, controlsState) {
        return {
            restrict: 'A',
            link: function (scope, elements, attrs) {
                var w = attrs.canvasWidth;
                var h = attrs.canvasHeight;
                var canvasElement = elements[0];

                drawing.paper = Raphael(canvasElement, w, h);
                var paper = drawing.paper;

                //background
                
                var background = paper.rect(0, 0, w, h);
                drawing.backgroundElementId = background.id;
                
                background.attr("fill", "#FFF")
                    .attr("stroke", "#000");
                
                

                //foreground for pen drawing
                
                var drawingSurface = paper.rect(0, 0, w, h);                
                drawing.drawingSurfaceElementId = drawingSurface.id;
                
                drawingSurface
                    .attr("fill", "#000")
                    .attr("fill-opacity", 0)
                    .drag(
                    function onMove(dx, dy, x, y, e) {
                        switch (controlsState.selectedTool.id) {
                            case "pen":                                            
                                //keep within the bounds of the drawing surface
                                if (e.target == drawingSurface.node) {                                    
                                    pathDrawing.continuePath(e.offsetX, e.offsetY);
                                } else {
                                    pathDrawing.endPath();
                                }
                                break;
                        }
                    }
                    ,
                    function onStart(x, y, e) {
                        switch(controlsState.selectedTool.id) {
                            case "pen":
                                pathDrawing.startPath(e.offsetX, e.offsetY);
                                break;
                        }
                    },
                    function onEnd() {
                        switch(controlsState.selectedTool.id) {
                            case "pen":
                                pathDrawing.endPath();
                                drawingSurface.toFront();
                                break;
                        }
                    }
                );
                
            }
        }
    }]);