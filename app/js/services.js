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

                this.pathInProgress.attr ("stroke", toolSelection.selectedColour.colourValue);

                shapeEvents.addEvents(this.pathInProgress);
                                
            }.bind(this),

            continuePath: function (x, y) {
                if(this.pathStringInProgress.length){
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
                var toRemove = this.paper.set();

                this.paper.forEach(function(el) {
                    if (el !== backgroundElement) {
                        toRemove.push(el);
                    }
                });
                
                toRemove.remove();                                                              
            },

            //set in the canvas directive
            paper: undefined,
            backgroundElementId: undefined
        }
    }])

    .service('shapeEvents', ['toolSelection', function (toolSelection) {
        return{
            addEvents: function (raphaelEl) {
                  this.addEraseEvent(raphaelEl);
            },
            
            addEraseEvent: function(raphaelEl) {
                raphaelEl.mouseover(function(e){
                    var isLeftButtonPressed = e.which === 1;
                    if(isLeftButtonPressed && toolSelection.selectedTool.id === "eraser"){
                        raphaelEl.remove();
                    }

                });
            }
        }
    }])

    .factory('toolSelection', function() {
        var defaults = {
            colours:[
                {name: "Black", colourValue: "#000"},
                {name: "Blue", colourValue: "#00F"}
            ],
            tools:[
                {name: "Pen", id:"pen"},
                {name: "Line Eraser", id:"eraser"}
            ]
        };

        defaults.selectedColour = defaults.colours[0];
        defaults.selectedTool = defaults.tools[0];

        return defaults;

    });