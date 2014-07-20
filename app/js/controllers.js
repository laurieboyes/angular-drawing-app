'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ToolsController', ['tools', '$scope', function (tools, $scope) {
        $scope.colours = tools.colours;

        $scope.setSelectedColour = function() {
            tools.selectedColour = $scope.selectedColour;
        };

        $scope.$watch( function () { return tools.selectedColour; }, function ( selectedColour ) {
            $scope.selectedColour = selectedColour;
        });

    }]);
