(function() {
  'use strict';

  var module = angular.module('app.core.elements');
  module.directive('iconSidebar', function(iconSidebarService) {
    return {
      restrict: 'E',
      templateUrl: 'app/core/elements/icon-sidebar/icon-sidebar-template.html',
      scope: {},
      link: function($scope, element, attrs) {
        function onSidebarClick(event) {
          if (event.currentTarget.classList.contains('active')) {
            iconSidebarService.closeSidebar(event.currentTarget);
          } else {
            iconSidebarService.closeOpenSidebars();
            iconSidebarService.openSidebar(event.currentTarget);
          }
        }

        (function setupPopovers() {
          var bsPopoverOpts = {
            delay: {'show': 1, 'hide': 1},
            trigger: 'hover',
            viewport: 'body',
            container: 'body'
          };

          $('.iconSidebar .btn-pill')
            .popover(bsPopoverOpts)
            .click(onSidebarClick);
        })();

      }
    };
  });
})();
