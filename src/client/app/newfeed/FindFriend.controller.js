(function() {
  'use strict';

  angular
    .module('app.newfeed')
    .controller('FindFriendController', NewFeedController);

  NewFeedController.$inject = ['$q', 'dataservice', 'logger', '$rootScope'];
  /* @ngInject */
  function NewFeedController($q, dataservice, logger, $rootScope) {
    var vm = this;
    $rootScope.haveHeader = true;
    $rootScope.haveSidebar = true;

    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'NewFeed';
  }
})();
