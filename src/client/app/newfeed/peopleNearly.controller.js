(function() {
  'use strict';

  angular
    .module('app.newfeed')
    .controller('PeopleNearlyController', NewFeedController);
    NewFeedController.$inject = ['$rootScope', '$scope', '$q', 'dataservice', 'logger'];
    function NewFeedController($rootScope, $scope, $q, dataservice, logger) {
      var vm = this;
      vm.title = 'People Nearly';
      $rootScope.haveHeader = true;
      $rootScope.haveSidebar = true;
    }
  })();
