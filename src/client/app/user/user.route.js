(function() {
  'use strict';

  angular
    .module('app.user')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'login',
        config: {
          url: '/login',
          templateUrl: 'app/user/login.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          title: 'Login'
        }
      },
      {
        state: 'profile',
        config: {
          url: '/profile',
          templateUrl: 'app/user/profile.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          title: 'profile'
        }
      }
    ];
  }
})();
