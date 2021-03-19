(function() {
  'use strict';

  angular
    .module('blocks.spinner')
    .factory('spinner', spinner);

  spinner.$inject = ['common', 'commonConfig'];

  /* @ngInject */
  function spinner(common, commonConfig) {
      var service = {
          spinnerHide: spinnerHide,
          spinnerShow: spinnerShow
      };

      return service;

      function spinnerHide() { spinnerToggle(false); }

      function spinnerShow() { spinnerToggle(true); }

      function spinnerToggle(show) {
          common.$broadcast(commonConfig.config.spinnerToggleEvent, { show: show });
      }
  }
} ());
