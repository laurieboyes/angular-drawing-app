'use strict';

/* Services */

angular.module('myApp.services', [])

    .service('pathTool', ['drawing', 'toolState', 'shapeEvents', function (drawing, toolState, shapeEvents) {
        return{

            pathStringInProgress: "",
            pathInProgress: undefined,

            startShape: function (x, y) {
                this.pathStringInProgress = "M" + x + "," + y;
                this.pathInProgress = drawing.paper.path(this.pathStringInProgress);

                //Ensure we still draw onto the drawing surface
                drawing.drawingSurfaceElement.toFront();
                
                this.pathInProgress.attr(
                    {
                        "stroke": toolState.selectedColour.colourValue,
                        "stroke-width": toolState.selectedSize.sizeValue
                    }
                );
                
                shapeEvents.addEvents(this.pathInProgress);

            }.bind(this),

            continueShape: function (x, y) {
                if (this.pathStringInProgress.length) {
                    this.pathStringInProgress += "L" + x + "," + y;
                    this.pathInProgress.attr("path", this.pathStringInProgress);

                }
            }.bind(this),

            endShape: function () {
                this.pathStringInProgress = "";
                this.pathInProgress = undefined;
            }.bind(this)
        }
    }])

    .service('ellipseTool', ['drawing', 'toolState', 'shapeEvents', function (drawing, toolState, shapeEvents) {
        return{

            ellipseInProgress: undefined,
            origin: undefined,

            startShape: function (x, y) {
                this.origin = {"x": x, "y": y};
                this.ellipseInProgress = drawing.paper.ellipse(this.origin.x,this.origin.y, 0, 0);

                //Ensure we still draw onto the drawing surface
                drawing.drawingSurfaceElement.toFront();

                this.ellipseInProgress.attr(
                    {
                        "stroke": toolState.selectedColour.colourValue,
                        "stroke-width": toolState.selectedSize.sizeValue
                    }
                );

                shapeEvents.addEvents(this.ellipseInProgress);

            }.bind(this),

            continueShape: function (x, y) {
                if (this.ellipseInProgress !== undefined) {
                    this.ellipseInProgress.attr("rx", Math.abs(x - this.origin.x));
                    this.ellipseInProgress.attr("ry", Math.abs(y - this.origin.y));
                }
            }.bind(this),

            endShape: function () {
                this.ellipseInProgress = undefined;
            }.bind(this)
        }
    }])

    .service('drawing', [function () {
        return{
            clear: function () {

                //save the background and the drawing surface
                var backgroundElement = this.backgroundElement;
                var drawingSurfaceElement = this.drawingSurfaceElement;
                var toRemove = this.paper.set();

                this.paper.forEach(function (el) {
                    if (el !== backgroundElement && el !== drawingSurfaceElement) {
                        toRemove.push(el);
                    }
                });

                toRemove.remove();
            },

            enablePathDrawing: function () {
                this.drawingSurfaceElement.toFront();
                this.drawMode = true;
            },
            
            disablePathDrawing: function () {
                this.drawingSurfaceElement.toBack();
                this.drawMode = false;
            },

            //set in the canvas directive
            drawMode: true,
            paper: undefined,
            backgroundElement: undefined,
            drawingSurfaceElement: undefined
        }
    }])

    .service('shapeEvents', ['toolState', function (toolState) {
        return{
            addEvents: function (raphaelEl) {
                this.addEraseEvent(raphaelEl);
            },

            addEraseEvent: function (raphaelEl) {
                raphaelEl.click(function (e) {
                    if (toolState.selectedTool.id === "eraser") {
                        raphaelEl.remove();
                    }

                });
                raphaelEl.mouseover(function (e) {
                    var isLeftButtonPressed = e.which === 1;
                    if (isLeftButtonPressed && toolState.selectedTool.id === "eraser") {
                        raphaelEl.remove();
                    }

                });
            }
        }
    }])

    .factory('toolState', function () {
        var defaults = {
            colours: [
                {name: "Black", colourValue: "#000"},
                {name: "Red", colourValue: "#F00"},
                {name: "Green", colourValue: "#0F0"},
                {name: "Blue", colourValue: "#00F"},
                {name: "White", colourValue: "#FFF"}
            ],
            tools: [
                {name: "Pen", id: "pen"},
                {name: "Ellipse", id: "ellipse"},
                {name: "Shape Eraser", id: "eraser"}
            ],
            sizes: [
                {name: "Small", sizeValue: 3},
                {name: "Medium", sizeValue: 8},
                {name: "Large", sizeValue: 16},
                {name: "Giant", sizeValue: 32}
            ]
        };

        defaults.selectedColour = defaults.colours[0];
        defaults.selectedTool = defaults.tools[0];
        defaults.selectedSize = defaults.sizes[1];

        return defaults;

    });