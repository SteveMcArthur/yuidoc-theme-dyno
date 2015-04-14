(function() {
  'use strict';
  var module = angular.module('app.core.elements');
  module.directive('treeSidebar', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/core/elements/tree-sidebar/tree-sidebar-template.html',
      transclude: true,
      link: function($scope) {
        $scope.treeSidebarFilterText = '';
      }
    };
  });
})();
