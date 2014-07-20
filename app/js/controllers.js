'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    
//    todo look into nesting controllers?
    
    .controller('ControlsController', ['controlsState', 'drawing', '$scope', function (controlsState, drawing, $scope) {

        // Colours
        
        $scope.colours = controlsState.colours;
        $scope.setSelectedColour = function() {
            controlsState.selectedColour = $scope.selectedColour;
        };
        $scope.$watch( function () { return controlsState.selectedColour; }, function ( selectedColour ) {
            $scope.selectedColour = selectedColour;
        });
        
        
        // Tools
        $scope.tools = controlsState.tools;
        $scope.setSelectedTool = function() {
            controlsState.selectedTool = $scope.selectedTool;

            if ($scope.selectedTool.id === "pen") {
                drawing.enablePathDrawing();
            } else {
                drawing.disablePathDrawing();
            }
        };
        $scope.$watch( function () { return controlsState.selectedTool; }, function ( selectedTool ) {
            $scope.selectedTool = selectedTool;
        });

//        Pen Size
        
        $scope.sizes = controlsState.sizes;
        $scope.setSelectedSize = function() {
            controlsState.selectedSize = $scope.selectedSize;
        };
        $scope.$watch( function () { return controlsState.selectedSize; }, function ( selectedSize ) {
            $scope.selectedSize = selectedSize;
        })
    }])
            
    .controller('ClearController', ['drawing', '$scope', function (drawing, $scope) {
        
//        Clear
        $scope.clear = function() {
            drawing.clear();
        }

    }]);
