(function() {
  'use strict';

  angular
    .module('app.newfeed')
    .controller('NewFeedController', NewFeedController);

  NewFeedController.$inject = ['$q', 'dataservice', 'logger', '$rootScope', '$location', '$cookies'];
  /* @ngInject */
  function NewFeedController($q, dataservice, logger, $rootScope, $location, $cookies) {
    var vm = this;
    $rootScope.haveHeader = true;
    $rootScope.haveSidebar = true;
    // vm.currentUser = JSON.parse(localStorage.getItem("user"));
    

    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Trang cá nhân';

    active();

    function active() {
      
    }
  }
})();
