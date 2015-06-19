(function() {
  'use strict';


  var module = angular.module('app.core.elements');
  module.directive('treeSidebar', function() {

    //function setDefaultAttrs(attrs) {
    //  if (!attrs.drawerWidth) {
    //    attrs.drawerWidth = '256px';
    //  }
    //  if (!attrs.responsiveWidth) {
    //    attrs.responsiveWidth = '640px';
    //  }
    //}

    return {
      restrict: 'E',
      templateUrl: 'app/core/elements/tree-sidebar/tree-sidebar-template.html',
      transclude: true,
      scope: {
        drawerWidth: '=?',
        responsiveWidth: '=?'
      },

      link: function($scope, element, attrs) {

        // setDefaultAttrs(attrs);

        element[0].onlyMe = function() {
          console.log('test');
        }
      }

    };
  });




})();
