(function() {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var events = {
    controllerActivateSuccess: 'controller.activateSuccess',
    spinnerToggle: 'spinner.toggle'
  };

  var config = {
    appErrorPrefix: '[Wiki Error] ',
    appTitle: 'WIKI',
    events: events,
    baseServiceUri: 'https://localhost:44343/webservice/',
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider', 'commonConfigProvider'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, commonConfigProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    commonConfigProvider.config.spinnerToggleEvent = config.events.spinnerToggle;
    commonConfigProvider.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ' | ' });
  }

})();
