'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ColourController', ['toolSelection', 'drawing', '$scope', function (toolSelection, drawing, $scope) {
        
        $scope.colours = toolSelection.colours;

        $scope.setSelectedColour = function() {
            toolSelection.selectedColour = $scope.selectedColour;
        };

        $scope.$watch( function () { return toolSelection.selectedColour; }, function ( selectedColour ) {
            $scope.selectedColour = selectedColour;
        });
    }])

    .controller('ToolsController', ['toolSelection', 'drawing', '$scope', function (toolSelection, drawing, $scope) {
        $scope.tools = toolSelection.tools;

        $scope.setSelectedTool = function() {
            toolSelection.selectedTool = $scope.selectedTool;
            
//            Not sure this belongs here
            if($scope.selectedTool.id === "pen") {
                drawing.enablePathDrawing();
            } else {
                drawing.disablePathDrawing();
            }
        };

        $scope.$watch( function () { return toolSelection.selectedTool; }, function ( selectedTool ) {           
            $scope.selectedTool = selectedTool;
        });
    }])

    .controller('SizeController', ['toolSelection', '$scope', function (toolSelection, $scope) {
        $scope.sizes = toolSelection.sizes;

        $scope.setSelectedSize = function() {
            toolSelection.selectedSize = $scope.selectedSize;
        };

        $scope.$watch( function () { return toolSelection.selectedSize; }, function ( selectedSize ) {
            $scope.selectedSize = selectedSize;
        });
    }])
    
    .controller('ClearController', ['drawing', '$scope', function (drawing, $scope) {
        
//        Clear
        $scope.clear = function() {
            drawing.clear();
        }

    }]);
