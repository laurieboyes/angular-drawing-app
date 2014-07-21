'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    
//    todo look into nesting controllers?
    
    .controller('ControlsController', ['toolState', 'drawing', '$scope', function (toolState, drawing, $scope) {

        // Colours
        
        $scope.colours = toolState.colours;
        $scope.setSelectedColour = function() {
            toolState.selectedColour = $scope.selectedColour;
        };
        $scope.$watch( function () { return toolState.selectedColour; }, function ( selectedColour ) {
            $scope.selectedColour = selectedColour;
        });
        
        
        // Tools
        $scope.tools = toolState.tools;
        $scope.setSelectedTool = function() {
            toolState.selectedTool = $scope.selectedTool;

            if ($scope.selectedTool.id === "pen") {
                drawing.enablePathDrawing();
            } else {
                drawing.disablePathDrawing();
            }
        };
        $scope.$watch( function () { return toolState.selectedTool; }, function ( selectedTool ) {
            $scope.selectedTool = selectedTool;
        });

//        Pen Size
        
        $scope.sizes = toolState.sizes;
        $scope.setSelectedSize = function() {
            toolState.selectedSize = $scope.selectedSize;
        };
        $scope.$watch( function () { return toolState.selectedSize; }, function ( selectedSize ) {
            $scope.selectedSize = selectedSize;
        })
    }])
            
    .controller('ClearController', ['drawing', '$scope', function (drawing, $scope) {
        
//        Clear
        $scope.clear = function() {
            drawing.clear();
        }

    }]);
