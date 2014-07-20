'use strict';

/* Services */

angular.module('myApp.services', [])
    .service('drawing', function () {
        return{

            pathStringInProgress: "",
            pathInProgress: undefined,

            startPath: function (paper, x, y) {
                this.pathStringInProgress = "M" + x + "," + y;
                this.pathInProgress = paper.path(this.pathStringInProgress);
            }.bind(this),

            continuePath: function (paper, x, y) {
                if(this.pathStringInProgress.length){
                    this.pathStringInProgress += "L" + x + "," + y;
                    this.pathInProgress.remove();
                    this.pathInProgress = paper.path(this.pathStringInProgress);
                }
            }.bind(this),

            endPath: function () {
                this.pathStringInProgress = "";
                this.pathInProgress = undefined;
            }.bind(this)
        }
    })
    .factory('tools', function() {
        var defaults = {
            colours:[
                {name: "Black", value: "#000"},
                {name: "Blue", value: "#00F"}
            ]
        };

        defaults.selectedColour = defaults.colours[0];

        return defaults;

    });