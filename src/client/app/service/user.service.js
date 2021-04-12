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

      function SubmitAvatarProfile(image, id) {
        var request = {
          Id: id,
          Avatar: image
        }
        return $http.put(config.baseServiceUri + prefixUsers + "updateavatar", request);
      }

      function SubmitCoverProfile(image, id) {
        var request = {
          Id: id,
          CoverImage: image
        }
        return $http.put(config.baseServiceUri + prefixUsers + "updatecover", request);
      }

      function SubmitUpdateAbout(about, id) {
        var request = {
          Id: id,
          About: about
        }
        return $http.put(config.baseServiceUri + prefixUsers + "updateabout", request);
      }

      function getPostByUser(id) {
        return $http.get(config.baseServiceUri + prefixUsers + id + "/post");
      }

      function getAblumnByUser(id) {
        return $http.get(config.baseServiceUri + "ablums/" + id + "/photo");
      }

      function getFriendByUser(id) {
        return $http.get(config.baseServiceUri + "friends/" + id + "/following");
      }

      function getDetailUser(id) {
        return $http.get(config.baseServiceUri + prefixUsers + id + "/detail");
      }
      function getNotifiedByUser(id) {
        return $http.get(config.baseServiceUri + prefixUsers + id + "/notified");
      }
      var service = {
          userRegister: userRegister,
          checkCustomerCheckExisted: checkCustomerCheckExisted,
          UpdatePassword: UpdatePassword,
          UserSignIn: UserSignIn,
          SubmitAvatarProfile: SubmitAvatarProfile,
          SubmitCoverProfile: SubmitCoverProfile,
          SubmitUpdateAbout: SubmitUpdateAbout,
          getPostByUser: getPostByUser,
          getAblumnByUser: getAblumnByUser,
          getFriendByUser: getFriendByUser,
          getDetailUser: getDetailUser,
          getNotifiedByUser: getNotifiedByUser
      };
      return service;
    }
})();
