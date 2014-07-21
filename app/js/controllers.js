'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    
    .controller('ToolsStateController', ['toolState', 'drawing', '$scope', function (toolState, drawing, $scope) {

        // Colours        
        $scope.colours = toolState.colours;        
        $scope.$watch( function () { return toolState.selectedColour; }, function ( selectedColour ) {
            $scope.selectedColour = selectedColour;
        });
                
        // Tools
        $scope.tools = toolState.tools;        
        $scope.$watch( function () { return toolState.selectedTool; }, function ( selectedTool ) {
            $scope.selectedTool = selectedTool;
        });

//        Pen Size        
        $scope.sizes = toolState.sizes;
        $scope.$watch( function () { return toolState.selectedSize; }, function ( selectedSize ) {
            $scope.selectedSize = selectedSize;
        })
    }])

    .controller('ToolController', ['toolState', 'drawing', '$scope', function (toolState, drawing, $scope) {

        $scope.setSelectedTool = function() {
            toolState.selectedTool = $scope.selectedTool;

            if ($scope.selectedTool.id === "pen" || $scope.selectedTool.id === "ellipse") {
                drawing.enablePathDrawing();
            } else {
                drawing.disablePathDrawing();
            }
        };

    }])

    .controller('ColourController', ['toolState', '$scope', function (toolState, $scope) {

        $scope.setSelectedColour = function() {
            toolState.selectedColour = $scope.selectedColour;
        };

    }])

    .controller('SizeController', ['toolState', '$scope', function (toolState, $scope) {

        $scope.setSelectedSize = function() {
            toolState.selectedSize = $scope.selectedSize;
        };
        
    }])


            
    .controller('ClearController', ['drawing', '$scope', function (drawing, $scope) {        
        
        $scope.clear = function() {
            drawing.clear();
        }
        
    }]);
