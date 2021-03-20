(function() {
  'use strict';

  angular
    .module('app.newfeed')
    .controller('NewFeedController', NewFeedController);

  NewFeedController.$inject = ['$q', 'dataservice', 'logger', '$scope','$rootScope', '$location', '$cookies', '$uibModal'];
  /* @ngInject */
  function NewFeedController($q, dataservice, logger, $scope, $rootScope, $location, $cookies, $uibModal) {
    var vm = this;
    $rootScope.haveHeader = true;
    $rootScope.haveSidebar = true;
    // vm.currentUser = JSON.parse(localStorage.getItem("user"));
    //function
    vm.OpenPost = OpenPost;

    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Trang cá nhân';

    active();

    function active() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          $scope.$apply(function() {
            $scope.position = position;
          });
        });
      }
    }
    function OpenPost() {
      var modalNeedToReturn = $uibModal.open({
        animation: true,
        templateUrl: 'OpenPost.html',
        controller: 'OpenPostCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'xl'
      });
    }
  }

  var OpenPostCtrl = 'OpenPostCtrl';
  angular.module('app.newfeed')
  .controller(OpenPostCtrl,['$scope', '$uibModalInstance',OpenPostFunction]);
  function OpenPostFunction($scope, $uibModalInstance) {
    var vm = this;
    vm.cancel = cancel;
    vm.ZoomImage = ZoomImage;
    vm.closeZoomFunct = closeZoomFunct;

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ZoomImage(img) {
      vm.zoomImg = img;
      vm.myZoom = true;
    }
    function closeZoomFunct(){
      vm.myZoom = false;
    }
    //library image upload https://github.com/danialfarid/ng-file-upload
    $scope.SelectFile = function(event) {
      vm.PreviewImage = [];
      for(var i=0;i<event.target.files.length;i++) {
          var reader = new FileReader();
          reader.onload = function (e) {
              vm.PreviewImage.push(e.target.result) ;
              $scope.$apply();
          };
          reader.readAsDataURL(event.target.files[i])
      }
    }
  }
})();
