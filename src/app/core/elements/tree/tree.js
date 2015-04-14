(function() {
  'use strict';

  var module = angular.module('app.core.elements');
  module.directive('tree', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<div class="tree" ng-transclude></div>'
    };
  });

  module.directive('treeList', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<ul class="tl" role="menu" ng-transclude></ul>'
    };
  });

  module.directive('treeNode', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<li class="tn" role="listitem" ng-transclude></li>'
    };
  });

  module.directive('treeItem', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<a class="ti ti-{{skin}}" role="link" ng-transclude></a>',
      scope: {
        skin: '@'
      }
    };
  });
})();
