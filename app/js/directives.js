'use strict';

/* Directives */

angular.module('myApp.directives', [])

    .directive('canvas', ['drawing','pathTool', 'ellipseTool', 'toolState', function (drawing, pathTool, ellipseTool, toolState) {
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
                        var drawingTool;
                        if(drawing.drawMode){                           
                            drawingTool = getDrawingTool(toolState.selectedTool.id);
                            
                            //keep within the bounds of the drawing surface
                            if (e.target == drawingSurface.node) {
                                mouseEventPolyfillOffset(e, element);
                                drawingTool.continueShape(e.layerX, e.layerY);
                            } else {
                                drawingTool.endShape();
                            }
                        }                       
                    }
                    ,
                    function onStart(x, y, e) {
                        var drawingTool;
                        if (drawing.drawMode) {
                            //keep within the bounds of the drawing surface
                            if (e.target == drawingSurface.node) {
                                drawingTool = getDrawingTool(toolState.selectedTool.id);
                                mouseEventPolyfillOffset(e, element);
                                drawingTool.startShape(e.layerX, e.layerY);
                            }
                        }
                    },
                    function onEnd() {

                        var drawingTool;
                        if (drawing.drawMode) {
                            drawingTool = getDrawingTool(toolState.selectedTool.id);
                            drawingTool.endShape();
                            drawingSurface.toFront();
                        }                       
                    }
                );
                
                var getDrawingTool = function(toolId){
                    switch (toolId) {
                        case "pen":
                            return pathTool;
                        case "ellipse":
                            return ellipseTool;
                    }
                };

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