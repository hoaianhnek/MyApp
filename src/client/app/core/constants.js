/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('RESPONSECODE', {
      Ok: '20010',
      NoData: '20011',
      CustomerNotExisted: '40110',
      CustomerExisted: '40111',
      Unauthorized: '40112'
    })
})();
