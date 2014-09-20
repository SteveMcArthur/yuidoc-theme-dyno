(function () {
	"use strict";

	var controllers = angular.module("app.controllers", ["app.services", "ngSanitize"]);

	controllers.controller("appController",
		function appController($scope, docService, marked) {

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

			$scope.getClassesByModuleName = function (moduleName) {
				var results = {};
				angular.forEach($scope.classes, function (value, key) {
					if (value.module === moduleName)
						results[key] = value;
				});
				return results;
			};

			$scope.getClassItemsByModuleAndClassName = function (moduleName, className) {
				var results = [];
				angular.forEach($scope.classItems, function (value) {
					if (value.module === moduleName && value.class === className)
						results.push(value);
				});
				return results;
			};

		}
	);

	controllers.controller("sidebarController",
		function sidebarController($scope) {
			$scope.allSidebarFilterText = "";
			$scope.classesSidebarFilterText = "";
			$scope.modulesSidebarFilterText = "";
			$scope.methodsSidebarFilterText = "";
			$scope.propertiesSidebarFilterText = "";
		}
	);

	controllers.controller("iconSidebarController",
		function iconSidebarController($scope, elementService, iconSidebarService) {

			function setupPopovers() {

				var bsPopoverOpts = {
					delay: {"show": 1, "hide": 1},
					trigger: 'hover',
					viewport: 'body',
					container: 'body'
				};

				$(".iconSidebar .btn-pill")
					.popover(bsPopoverOpts)
					.click(function (event) {

						if (elementService.isElementActive(event.currentTarget)) {
							iconSidebarService.closeSidebar(event.currentTarget);
						} else {
							iconSidebarService.closeOpenSidebars();
							iconSidebarService.openSidebar(event.currentTarget);
						}

					});

			}

			setupPopovers();
		}
	);

}());