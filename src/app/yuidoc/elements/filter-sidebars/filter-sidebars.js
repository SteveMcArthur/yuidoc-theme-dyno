(function() {
  'use strict';
  var module = angular.module('app.yuidoc.elements');
  module.directive('filterAllSidebar', function($sce, yuidocDataService) {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/filter-sidebars/templates/filter-all-sidebar-template.html',
      scope: {
        modules: '=',
        globalClasses: '='
      },
      link: function($scope) {
        $scope.getClassesByModuleName = function(moduleName) {
          return yuidocDataService.getClassesByModuleName(moduleName);
        };

        $scope.getClassItemsByModuleAndClassName = function(moduleName, className) {
          return yuidocDataService.getClassItemsByModuleAndClassName(moduleName, className);
        };
      }
    };
  });

  module.directive('filterClassesSidebar', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/filter-sidebars/templates/filter-classes-sidebar-template.html',
      scope: {
        classes: '='
      }
    };
  });

  module.directive('filterModulesSidebar', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/filter-sidebars/templates/filter-modules-sidebar-template.html',
      scope: {
        modules: '='
      }
    };
  });

  module.directive('filterMethodsSidebar', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/filter-sidebars/templates/filter-methods-sidebar-template.html',
      scope: {
        classItems: '='
      }
    };
  });

  module.directive('filterPropertiesSidebar', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/filter-sidebars/templates/filter-properties-sidebar-template.html',
      scope: {
        classItems: '='
      }
    };
  });

  module.directive('classItemsList', function(yuidocDataService) {
    return {
      restrict: 'E',
      templateUrl: 'app/yuidoc/elements/filter-sidebars/templates/class-items-list-template.html',
      replace: true,
      scope: {
        module: '=',
        className: '='
      },
      link: function($scope) {
        $scope.getClassItemsByModuleAndClassName = function(moduleName, className) {
          return yuidocDataService.getClassItemsByModuleAndClassName(moduleName, className);
        };
      }
    };
  });

})();
