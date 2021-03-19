(function() {
  'use strict';

  angular
    .module('app.newfeed')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$q', 'dataservice', 'logger', '$rootScope', '$uibModal'];
  /* @ngInject */
  function MessageController($q, dataservice, logger, $rootScope, $uibModal) {
    var vm = this;
    $rootScope.haveHeader = true;
    $rootScope.haveSidebar = true;

    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'NewFeed';

    //function
    vm.OpenVoiceCall = OpenVoiceCall;
    vm.OpenVideoCall = OpenVideoCall;
    vm.OpenNewGroup = OpenNewGroup;

    function OpenVoiceCall() {
      var modalNeedToReturn = $uibModal.open({
        animation: true,
        templateUrl: 'OpenVoiceCall.html',
        controller: 'OpenVoiceCallCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'md',
      });
    }
    function OpenVideoCall() {
      var modalNeedToReturn = $uibModal.open({
        animation: true,
        templateUrl: 'OpenVideoCall.html',
        controller: 'OpenVideoCallCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'md',
      });
    }
    function OpenNewGroup() {
      var modalNeedToReturn = $uibModal.open({
        animation: true,
        templateUrl: 'OpenNewGroup.html',
        controller: 'OpenNewGroupCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'md',
      });
    }
  }
  var OpenVoiceCallCtrl = 'OpenVoiceCallCtrl';
  angular.module('app.newfeed')
  .controller(OpenVoiceCallCtrl,['$scope', '$uibModalInstance',OpenVoiceCallFunction]);
  function OpenVoiceCallFunction($scope, $uibModalInstance) {
    var vm = this;
    vm.cancel = cancel;

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
  var OpenVideoCallCtrl = 'OpenVideoCallCtrl';
  angular.module('app.newfeed')
  .controller(OpenVideoCallCtrl,['$scope', '$uibModalInstance',OpenVideoCallFunction]);
  function OpenVideoCallFunction($scope, $uibModalInstance) {
    var vm = this;
    vm.cancel = cancel;

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
  var OpenNewGroupCtrl = 'OpenNewGroupCtrl';
  angular.module('app.newfeed')
  .controller(OpenNewGroupCtrl,['$scope', '$uibModalInstance',OpenNewGroupFunction]);
  function OpenNewGroupFunction($scope, $uibModalInstance) {
    var vm = this;
    vm.cancel = cancel;

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
