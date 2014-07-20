'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ColourController', ['controlsState', 'drawing', '$scope', function (controlsState, drawing, $scope) {
        
        $scope.colours = controlsState.colours;

        $scope.setSelectedColour = function() {
            controlsState.selectedColour = $scope.selectedColour;
        };

        $scope.$watch( function () { return controlsState.selectedColour; }, function ( selectedColour ) {
            $scope.selectedColour = selectedColour;
        });
    }])

    .controller('ToolsController', ['controlsState', 'drawing', '$scope', function (controlsState, drawing, $scope) {
        $scope.tools = controlsState.tools;

        $scope.setSelectedTool = function() {
            controlsState.selectedTool = $scope.selectedTool;
            
//            Not sure this belongs here
            if($scope.selectedTool.id === "pen") {
                drawing.enablePathDrawing();
            } else {
                drawing.disablePathDrawing();
            }
        };

        $scope.$watch( function () { return controlsState.selectedTool; }, function ( selectedTool ) {           
            $scope.selectedTool = selectedTool;
        });
    }])

    .controller('SizeController', ['controlsState', '$scope', function (controlsState, $scope) {
        $scope.sizes = controlsState.sizes;

        $scope.setSelectedSize = function() {
            controlsState.selectedSize = $scope.selectedSize;
        };

        $scope.$watch( function () { return controlsState.selectedSize; }, function ( selectedSize ) {
            $scope.selectedSize = selectedSize;
        });
    }])
    
    .controller('ClearController', ['drawing', '$scope', function (drawing, $scope) {
        
//        Clear
        $scope.clear = function() {
            drawing.clear();
        }

    }]);
