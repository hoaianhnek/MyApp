(function() {
  'use strict';

  angular
    .module('app.newfeed')
    .controller('InforDatingController', InforDatingController);

    InforDatingController.$inject = ['$q', 'dataservice', 'logger', '$rootScope', '$uibModal'];
  /* @ngInject */
  function InforDatingController($q, dataservice, logger, $rootScope, $uibModal) {
    var vm = this;
    $rootScope.haveHeader = true;
    $rootScope.haveSidebar = true;

    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Infor Dating';

    //function
  }
})();
