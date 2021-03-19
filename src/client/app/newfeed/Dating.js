(function() {
  'use strict';

  angular
    .module('app.newfeed')
    .controller('DatingController', DatingController);

    DatingController.$inject = ['$q', 'dataservice', 'logger', '$rootScope', '$uibModal'];
  /* @ngInject */
  function DatingController($q, dataservice, logger, $rootScope, $uibModal) {
    var vm = this;
    $rootScope.haveHeader = true;
    $rootScope.haveSidebar = true;

    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dating';

    //function
  }
})();
