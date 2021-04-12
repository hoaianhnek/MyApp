(function() {
  'use strict';
    var prefixPosts = 'posts/';
  angular
    .module('app.service')
    .factory('postService', postService);

    postService.$inject = ['$http', 'config', 'common'];
    function postService($http, config, common) {

      function CreatePost(request) {
        return $http.post(config.baseServiceUri + prefixPosts + "create", request);
      }
      
      var service = {
          CreatePost: CreatePost
      };
      return service;
    }
})();
