(function() {
  'use strict';
    var prefixUsers = 'users/';
  angular
    .module('app.service')
    .factory('userService', userService);

    userService.$inject = ['$http', 'config', 'common'];
    function userService($http, config, common) {

      function userRegister(request) {
        return $http.post(config.baseServiceUri + prefixUsers + "register", request);
      }

      function checkCustomerCheckExisted(mobilePhone) {
        var request = { Value: mobilePhone};
        return $http.post(config.baseServiceUri + prefixUsers + "checkexisted", request);
      }

      function UpdatePassword(mobilePhone, password) {
        var request = {
          MobilePhone: mobilePhone,
          Password: password
        };
        return $http.post(config.baseServiceUri + prefixUsers + "updatepassword", request);
      }
      function UserSignIn(userName, password) {
        var request = {
          UserName: userName,
          Password: password
        };
        return $http.post(config.baseServiceUri + prefixUsers + "login", request);
      }
      var service = {
          userRegister: userRegister,
          checkCustomerCheckExisted: checkCustomerCheckExisted,
          UpdatePassword: UpdatePassword,
          UserSignIn: UserSignIn
      };
      return service;
    }
})();