'use strict';

/* Directives */

angular.module('myApp.directives', [])

    .directive('canvas', ['drawing','pathDrawing', 'ellipseDrawing', 'toolState', function (drawing, pathDrawing, ellipseDrawing, toolState) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var w = attrs.canvasWidth;
                var h = attrs.canvasHeight;
                var canvasElement = element[0];

                drawing.paper = Raphael(canvasElement, w, h);
                var paper = drawing.paper;               
                
                //background
                
                var background = paper.rect(0, 0, w, h);
                drawing.backgroundElement = background;
                
                background.attr("fill", "#FFF")
                    .attr("stroke", "#000");
                
                

                //foreground for pen drawing
                
                var drawingSurface = paper.rect(0, 0, w, h);                
                drawing.drawingSurfaceElement = drawingSurface;
                
                drawingSurface
                    .attr("fill", "#000")
                    .attr("fill-opacity", 0)
                    .drag(
                    function onMove(dx, dy, x, y, e) {
                        switch (toolState.selectedTool.id) {
                            case "pen":                                            
                                //keep within the bounds of the drawing surface
                                if (e.target == drawingSurface.node) {
                  
                                    mouseEventPolyfillOffset(e, element);
                                    
                                    pathDrawing.continuePath(e.layerX, e.layerY);
                                } else {
                                    pathDrawing.endPath();
                                }
                                break;
                            case "ellipse":
                                //keep within the bounds of the drawing surface
                                if (e.target == drawingSurface.node) {

                                    mouseEventPolyfillOffset(e, element);

                                    ellipseDrawing.continueEllipse(e.layerX, e.layerY);
                                } else {
                                    ellipseDrawing.endEllipse();
                                }
                                break;
                        }
                    }
                    ,
                    function onStart(x, y, e) {
                        switch(toolState.selectedTool.id) {
                            case "pen":

                                mouseEventPolyfillOffset(e, element);
                                
                                pathDrawing.startPath(e.layerX, e.layerY);
                                break;
                            case "ellipse":

                                mouseEventPolyfillOffset(e, element);

                                ellipseDrawing.startEllipse(e.layerX, e.layerY);
                                break;
                        }
                    },
                    function onEnd() {
                        switch(toolState.selectedTool.id) {
                            case "pen":
                                pathDrawing.endPath();
                                drawingSurface.toFront();
                                break;
                            case "ellipse":
                                ellipseDrawing.endEllipse();
                                drawingSurface.toFront();
                                break;
                        }
                    }
                );

                //For reasons I don't currently understand, this polyfill does not produce the desired effect if
                //its declaration is tidied away into the drawing service
                var mouseEventPolyfillOffset = function(event, angularElement) {
                    if(!event.offsetX) {

                        event.offsetX = (event.pageX - angularElement.prop('offsetLeft'));
                        event.offsetY = (event.pageY - angularElement.prop('offsetTop'));
                    }
                    return event;
                };
                
            }
        }
    }]);