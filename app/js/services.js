'use strict';

/* Services */

angular.module('myApp.services', [])

    .service('drawing', ['tools', function (tools) {
        return{

            pathStringInProgress: "",
            pathInProgress: undefined,

            startPath: function (paper, x, y) {
                this.pathStringInProgress = "M" + x + "," + y;
                this.pathInProgress = paper.path(this.pathStringInProgress);

                this.pathInProgress.attr ("stroke", tools.selectedColour.colourValue);

            }.bind(this),

            continuePath: function (paper, x, y) {
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


    .factory('tools', function() {
        var defaults = {
            colours:[
                {name: "Black", colourValue: "#000"},
                {name: "Blue", colourValue: "#00F"}
            ]
        };

        defaults.selectedColour = defaults.colours[0];

        return defaults;

    });