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

                    .mousedown(function(e) {
                        this.canvasMouseDown(e.offsetX, e.offsetY);
                    }.bind(this));
            },

            canvasMouseDown : function(x, y) {
                alert('Clicked here: x=' + x + ' y=' + y);
            }

        };
    }])

;