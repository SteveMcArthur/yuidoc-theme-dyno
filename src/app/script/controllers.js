(function () {
    "use strict";

    var controllers = angular.module("app.controllers", ["app.services", "ngSanitize"]);

    controllers.controller("appController",
        function appController($scope, apiService, marked, hljs) {

            // adds loading state object
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

            $scope.marked = marked;

            // fetch the data
            apiService.get()
                .then(function (data) {
                    $scope.project = data.project;
                    $scope.modules = data.modules;
                    $scope.classes = data.classes;
                    $scope.classItems = data.classitems;
                })
	            .then(apiService.getGlobalClasses)
	            .then(function(objDictResult){
		            $scope.globalClasses = objDictResult;
	            })
	            .catch(function(error) {
		            console.error(error);
	            });

        }
    );

    controllers.controller("sidebarController",
        function sidebarController($scope) {

            var moduleFilterText = "";
            Object.defineProperty($scope, "moduleFilterText", {
                get: function () {
                    return moduleFilterText;
                },
                set: function (newValue) {
                    moduleFilterText = newValue;
                }
            });

        }
    );

}());