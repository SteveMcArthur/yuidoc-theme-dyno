(function () {
	"use strict";

	var controllers = angular.module("app.controllers", ["app.services", "ngSanitize"]);

	controllers.controller("appController",
		function appController($scope, docService, marked, hljs) {

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
			docService.getProject()
				.then(function (project) {
					$scope.project = project;
				})
				.then(docService.getModules)
				.then(function (modules) {
					$scope.modules = modules;
				})
				.then(docService.getClasses)
				.then(function (classes) {
					$scope.classes = classes;
				})
				.then(docService.getClassItems)
				.then(function (classItems) {
					$scope.classItems = classItems;
				})
				.then(docService.getGlobalClasses)
				.then(function (globalClasses) {
					$scope.globalClasses = globalClasses;
				})
				.catch(function (error) {
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