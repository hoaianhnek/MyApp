(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$rootScope', '$q', 'dataservice', 'logger', '$cookies', '$uibModal'];
  /* @ngInject */
  function ProfileController($rootScope, $q, dataservice, logger, $cookies, $uibModal) {
    var vm = this;
    vm.news = {
      title: 'helloWorld',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.showProfilePost = true;
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Profile';
    $rootScope.haveHeader = true;
    $rootScope.haveSidebar = true;
    vm.currentUser = JSON.parse($cookies.get("user"));
console.log(vm.currentUser)

    vm.OpenPost = OpenPost;
    vm.OpenEditProfile = OpenEditProfile;

    function OpenPost() {
      var modalOpenPost = $uibModal.open({
        animation: true,
        templateUrl: 'OpenPost.html',
        controller: 'OpenPostCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'xl'
      });
    }

    function OpenEditProfile() {
      var modalEditProfile = $uibModal.open({
        animation: true,
        templateUrl: 'OpenEditProfile.html',
        controller: 'OpenEditProfileCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'xl'
      });
    }
  }

  var OpenEditProfileCtrl = 'OpenEditProfileCtrl';
  angular.module('app.user')
  .controller(OpenEditProfileCtrl,['$scope', '$uibModalInstance', '$cookies', '$uibModal',OpenEditProfileFunction]);

  function OpenEditProfileFunction($scope, $uibModalInstance, $cookies, $uibModal) {
    var vm = this;

    vm.cancel = cancel;
    vm.currentUser = JSON.parse($cookies.get("user"));
    vm.EditAvatar = EditAvatar;

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function EditAvatar() {
      var modalEditAvatar = $uibModal.open({
        animation: true,
        templateUrl: 'OpenEditAvatar.html',
        controller: 'OpenEditAvatarCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'xl'
      });
    }
  }

  var OpenEditAvatarCtrl = 'OpenEditAvatarCtrl';
  angular.module('app.user')
  .controller(OpenEditAvatarCtrl,['$scope', '$uibModalInstance', '$cookies', 'userService', '$rootScope',
  'RESPONSECODE', '$window',OpenEditAvatarFunction]);

  function OpenEditAvatarFunction($scope, $uibModalInstance, $cookies, userService, $rootScope, RESPONSECODE, $window) {
    var vm = this;

    vm.cancel = cancel;
    vm.SubmitAvatarProfile = SubmitAvatarProfile;

    vm.currentUser = JSON.parse($cookies.get("user"));
    var expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 12);

    vm.PreviewImage = vm.currentUser.Avatar;
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    $scope.SelectFile = function(event) {
      for(var i=0;i<event.target.files.length;i++) {
          var reader = new FileReader();
          reader.onload = function (e) {
              vm.PreviewImage = e.target.result ;
              $scope.$apply();
          };
        reader.readAsDataURL(event.target.files[i])
      }
    }

    function SubmitAvatarProfile() {
      $rootScope.showSplash = true;
      if(vm.PreviewImage == vm.currentUser.Avatar) {
        toastr.error('','Vui lòng tải ảnh lên');
        $rootScope.showSplash = false;
      } else {
        vm.Image = vm.PreviewImage.slice(vm.PreviewImage.indexOf('base64,') + 7);
        userService.SubmitAvatarProfile(vm.Image, vm.currentUser.Id).then(function(result) {
          $rootScope.showSplash = false;
          if(result.data.ResponseCode == RESPONSECODE.Ok) {
            toastr.success("","Cập nhật thành công");
            vm.currentUser.Avatar = result.data.Dto;
            $cookies.put("user",JSON.stringify(vm.currentUser), {'expires': expirationDate });
            $window.location.reload();
          } else {
            toastr.error("","Cập nhật thất bại")
          }
        });
      }
    }
  }
})();
