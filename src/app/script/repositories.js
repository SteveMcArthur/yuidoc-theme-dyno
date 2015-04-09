(function() {

  'use strict';

  var repositories = angular.module('app.repositories', ['ngResource']);

  repositories.service('dbProvider', function($resource, yuidocDataPath) {
    return {
      getDataset: function() {
        var paramDefaults = {},
          actions = {
            cache: true
          };

        return $resource(yuidocDataPath, paramDefaults, actions)
          .get()
          .$promise;
      }
    };
  });

  repositories.service('projectRepository', function(dbProvider) {
    return {
      get: function() {
        return dbProvider.getDataset().then(
          function(dataset) {
            return dataset.project;
          }
        );
      }
    };
  });

  repositories.service('modulesRepository', function(dbProvider) {
    return {
      all: function() {
        return dbProvider.getDataset().then(
          function(dataset) {
            return dataset.modules;
          }
        );
      }
    };
  });

  repositories.service('classesRepository', function(dbProvider, querifySync) {

    var cachedClasses_;

    return {
      all: function() {
        if (cachedClasses_ === undefined) {
          return dbProvider.getDataset().then(
            function(dataset) {
              cachedClasses_ = dataset.classes;
              return cachedClasses_;
            }
          );
        }
        return cachedClasses_;
      },
      extract: function(query) {
        return querifySync.extract(cachedClasses_, query);
      }
    };
  });

  repositories.service('classitemsRepository', function(dbProvider, querifySync) {

    var cachedClassItems_;

    return {
      all: function() {
        if (cachedClassItems_ === undefined) {
          return dbProvider.getDataset().then(
            function(dataset) {
              cachedClassItems_ = dataset.classitems;
              return cachedClassItems_;
            }
          );
        }
        return cachedClassItems_;
      },
      filter: function(query) {
        return querifySync.filter(cachedClassItems_, query);
      }
    };
  });

}());
