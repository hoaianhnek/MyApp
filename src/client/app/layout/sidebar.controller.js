(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state', 'routerHelper', '$cookies'];
  /* @ngInject */
  function SidebarController($state, routerHelper, $cookies) {
    var vm = this;
    //variables
    // vm.currentUser = JSON.parse($cookies.get("user"));
    // console.log('user current:',vm.currentUser)
    //funtion
    vm.isCurrent = isCurrent;
    var states = routerHelper.getStates();
    
    activate();

    function activate() { getNavRoutes(); }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }
  }
})();
