(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$rootScope', '$q', 'dataservice', 'logger'];
  /* @ngInject */
  function ProfileController($rootScope, $q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'helloWorld',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.showProfilePost = true;
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Profile';
    $rootScope.haveHeader = true;
    $rootScope.haveSidebar = true;
  }
})();
