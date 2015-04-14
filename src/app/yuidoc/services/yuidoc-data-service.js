(function() {
  'use strict';

  var services = angular.module('app.yuidoc.services');
  services.service('yuidocDataService', function($resource, querifySync, yuidocDataPath) {
    function YuidocDataService() {
      this.dataset_ = null;
      this.loaded = false;
    }

    YuidocDataService.prototype = {
      load: function() {
        var paramDefaults = {};
        var actions = {
          cache: true
        };
        var this_ = this;
        return $resource(yuidocDataPath, paramDefaults, actions)
          .get()
          .$promise
          .then(function(dataset) {
            this_.loaded = true;
            this_.dataset_ = dataset;
          });
      },
      get dataset() {
        if (this.dataset_ === null) {
          throw Error('YuidocDataService: dataset is not loaded.');
        }
        return this.dataset_;
      },
      getProject: function() {
        return this.dataset.project;
      },
      getModules: function() {
        return this.dataset.modules;
      },
      getClasses: function() {
        return this.dataset.classes;
      },
      getClassItems: function() {
        return this.dataset.classitems;
      },
      getGlobalClasses: function() {
        var query = {
          $not: {
            $has: 'module'
          }
        };
        return querifySync.extract(this.dataset.classes, query);
      },
      getClassesByModuleName: function(moduleName) {
        var query = {
          module: moduleName
        };
        return querifySync.extract(this.dataset.classes, query);
      },
      getClassItemsByModuleAndClassName: function(moduleName, className) {
        var query = {
          module: moduleName,
          class: className
        };
        return querifySync.filter(this.dataset.classitems, query);
      }
    };

    return new YuidocDataService();
  });
}());
