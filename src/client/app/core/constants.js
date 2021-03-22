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
      //401
      CustomerNotExisted: '40110',
      CustomerExisted: '40111',
      Unauthorized: '40112',
      //400
      NotFoundResourceToProcess: '40010',
      MaximizeImageSize: '40011',
      Base64StringIsMalformed: '40012'

    })
})();
