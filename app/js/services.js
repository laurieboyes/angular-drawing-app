'use strict';

/* Services */

angular.module('myApp.services', [])
    .service('raphael', [function() {
        return {
            makeCanvas : function(element, w,h) {
                Raphael(element, w, h)
                    .rect(0, 0, w, h)
                    .attr("fill", "#FFF")
                    .attr("stroke", "#000")
                    .click(this.canvasClick);
            },

            canvasClick : function(e) {
                alert('super clicked!')
            }

        };
    }])

;