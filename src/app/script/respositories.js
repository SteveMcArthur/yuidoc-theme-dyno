(function () {

	"use strict";

	var repositories = angular.module("app.repositories", ["ngResource"]);

	repositories.service("dbProvider", function ($resource, yuidocDataPath) {
		return {
			getDataset: function () {

				var paramDefaults = {},
					actions = {
						cache: true
					};

				return $resource(yuidocDataPath, paramDefaults, actions)
					.get()
					.$promise;

				//.catch(helpers.toErrorLog);
			}
		};
	});

	repositories.service("projectRepository", function (dbProvider) {
		return {
			read: function () {
				return dbProvider.getDataset().then(
					function (dataset) {
						return dataset.project;
					}
				);
			}
		};
	});

	repositories.service("modulesRepository", function (dbProvider) {
		return {
			list: function () {
				return dbProvider.getDataset().then(
					function (dataset) {
						return dataset.modules;
					}
				);
			}
		};
	});

	repositories.service("classesRepository", function (dbProvider, querify) {
		return {
			list: function () {
				return dbProvider.getDataset().then(
					function (dataset) {
						return dataset.classes;
					}
				);
			},
			query: function (query) {
				return dbProvider.getDataset().then(
					function (dataset) {
						return querify.extract(dataset.classes, query);
					}
				);
			}
		};
	});

	repositories.service("classitemsRepository", function (dbProvider) {
		return {
			list: function () {
				return dbProvider.getDataset().then(
					function (dataset) {
						return dataset.classitems;
					}
				);
			}
		};
	});

}());
