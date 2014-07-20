'use strict';

/* Services */

angular.module('myApp.services', [])

    .service('pathDrawing', ['drawing', 'toolSelection', 'shapeEvents', function (drawing, toolSelection, shapeEvents) {
        return{

            pathStringInProgress: "",
            pathInProgress: undefined,

            startPath: function (x, y) {
                this.pathStringInProgress = "M" + x + "," + y;
                this.pathInProgress = drawing.paper.path(this.pathStringInProgress);

                this.pathInProgress.attr(
                    {
                        "stroke": toolSelection.selectedColour.colourValue,
                        "stroke-width": toolSelection.selectedSize.sizeValue
                    }
                );
                
                
                shapeEvents.addEvents(this.pathInProgress);

            }.bind(this),

            continuePath: function (x, y) {
                if (this.pathStringInProgress.length) {
                    this.pathStringInProgress += "L" + x + "," + y;
                    this.pathInProgress.attr("path", this.pathStringInProgress);

                }
            }.bind(this),

            endPath: function () {
                this.pathStringInProgress = "";
                this.pathInProgress = undefined;
            }.bind(this)
        }
    }])

    .service('drawing', [function () {
        return{
            clear: function () {

                //save the background and all of its events
                var backgroundElement = this.paper.getById(this.backgroundElementId);
                var drawingSurfaceElement = this.paper.getById(this.drawingSurfaceElementId);
                var toRemove = this.paper.set();

                this.paper.forEach(function (el) {
                    if (el !== backgroundElement && el !== drawingSurfaceElement) {
                        toRemove.push(el);
                    }
                });

                toRemove.remove();
            },

            enablePathDrawing: function () {
                this.paper.getById(this.drawingSurfaceElementId).toFront();
            },
            
            disablePathDrawing: function () {
                this.paper.getById(this.drawingSurfaceElementId).toBack();
            },

            //set in the canvas directive
            paper: undefined,
            backgroundElementId: undefined,
            drawingSurfaceElementId: undefined
        }
    }])

    .service('shapeEvents', ['toolSelection', function (toolSelection) {
        return{
            addEvents: function (raphaelEl) {
                this.addEraseEvent(raphaelEl);
            },

            addEraseEvent: function (raphaelEl) {
                raphaelEl.click(function (e) {
                    if (toolSelection.selectedTool.id === "eraser") {
                        raphaelEl.remove();
                    }

                });
                raphaelEl.mouseover(function (e) {
                    var isLeftButtonPressed = e.which === 1;
                    if (isLeftButtonPressed && toolSelection.selectedTool.id === "eraser") {
                        raphaelEl.remove();
                    }

                });
            }
        }
    }])

//    Todo rename me
    .factory('toolSelection', function () {
        var defaults = {
            colours: [
                {name: "Black", colourValue: "#000"},
                {name: "Red", colourValue: "#F00"},
                {name: "Green", colourValue: "#0F0"},
                {name: "Blue", colourValue: "#00F"}
            ],
            tools: [
                {name: "Pen", id: "pen"},
                {name: "Line Eraser", id: "eraser"}
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