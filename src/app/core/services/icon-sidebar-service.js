(function() {
  'use strict';

  var services = angular.module('app.core.services');
  services.service('iconSidebarService', function() {
      // iconSidebarService
      return {
        closeOpenSidebars: function() {
          $('.docMain').removeClass('sidebarActive');
          $('.popoverSidebar').removeClass('in');
          $('.iconSidebar .btn-pill').removeClass('active');
        },
        openSidebar: function(iconLiElement) {
          var sidebarId = iconLiElement.getAttribute('data-target');
          $(sidebarId).addClass('in');
          $('.docMain').addClass('sidebarActive');
          iconLiElement.classList.add('active');
        },
        closeSidebar: function(iconLiElement) {
          var sidebarId = iconLiElement.getAttribute('data-target');
          document.querySelector(sidebarId).classList.remove('in');
          document.querySelector('.docMain').classList.remove('sidebarActive');
          iconLiElement.classList.remove('active');
        }
      };
    }
  );

})();
