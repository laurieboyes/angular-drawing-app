'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('ToolsController', ['$scope', function ($scope) {

        $scope.colours = [
            {name: "Black", value: "#000"},
            {name: "Blue", value: "#00F"}
        ];

        $scope.selectedColour = $scope.colours[0];

    }]);
