(function () {
    "use strict";

    var controllers = angular.module("app.controllers", ["app.services", "ngSanitize"]);

    controllers.controller("appController",
        function appController($scope, apiService) {

            var moduleFilterText = "";
            Object.defineProperty($scope, "moduleFilterText", {
                get: function () {
                    return moduleFilterText;
                },
                set: function (newValue) {
                    moduleFilterText = newValue;
                    $scope.apply()
                }
            });

            $scope.getClassItemTypeColour = function (classItemType) {
                switch (classItemType) {
                    case "module":
                        return "#534D4A";
                    case "class":
                        return "#856819";
                    case "method":
                        return "#2B6182";
                    case "property":
                        return "#6B1E4C";
                    case "attribute":
                        return "purple";
                    default:
                        return "black";
                }
            };

            marked.setOptions({
                highlight: function (code) {
                    return hljs.highlightAuto(code).value;
                }
            });

            $scope.marked = window.marked;

            // fetch the data
            apiService.get()
                .then(function (data) {
                    $scope.data = data;
                });
        }
    );

    controllers.controller("docController",
        function docController($scope, musicMathService) {


        }
    );

}());