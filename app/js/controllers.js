'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ToolsController', ['toolSelection', 'drawing', '$scope', function (toolSelection, drawing, $scope) {

//        Colour
        $scope.colours = toolSelection.colours;

        $scope.setSelectedColour = function() {
            toolSelection.selectedColour = $scope.selectedColour;
        };

        $scope.$watch( function () { return toolSelection.selectedColour; }, function ( selectedColour ) {
            $scope.selectedColour = selectedColour;
        });


//        Clear
        $scope.clear = function() {
            drawing.clear();
        }

    }]);
