(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', '$cookies', '$location'];
  /* @ngInject */
  function ShellController($rootScope, $timeout, config, logger, $cookies, $location) {
    var vm = this;
    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;
    $rootScope.showSplash = true;
    vm.currentUser = $cookies.get("user");
    vm.navline = {
      title: config.appTitle,
      text: 'Created by John Papa',
      link: 'http://twitter.com/john_papa'
    };
    if(vm.currentUser == null ) {
        $location.url('/login')
      }
    activate();

    function activate() {
      $rootScope.$watch('haveSidebar', function(newValue, oldValue) {
        vm.haveHeader = $rootScope.haveHeader;
        vm.haveSidebar = $rootScope.haveSidebar;
      });
      if(vm.currentUser == null) {
        $location.url('/login');
      }
      hideSplash();
    }

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function() {
        $rootScope.showSplash = false;
      }, 1000);
    }
  }
})();
