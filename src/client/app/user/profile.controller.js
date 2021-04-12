(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$rootScope', '$q', 'dataservice', 'logger', '$cookies', '$uibModal', 'common', 'userService',
  'RESPONSECODE', '$stateParams'];
  /* @ngInject */
  function ProfileController($rootScope, $q, dataservice, logger, $cookies, $uibModal, common, userService, RESPONSECODE,
    $stateParams) {
    var vm = this;
    vm.news = {
      title: 'helloWorld',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.showProfilePost = true;
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Trang cá nhân';
    $rootScope.haveHeader = true;
    $rootScope.haveSidebar = true;
    var id = $stateParams.id;
    vm.id = id;

    vm.currentUser = JSON.parse($cookies.get("user"));

    vm.OpenPost = OpenPost;
    vm.OpenEditProfile = OpenEditProfile;
    vm.OpenSlide = OpenSlide;
    vm.OpenAlbumPhoto = OpenAlbumPhoto;

    activate();
    function activate() {
      common.activateController([], 'ProfileController')
      .then(function() {
        $rootScope.showSplash = true;
        //get detail user
        userService.getDetailUser(id).then(function(result) {
          $rootScope.showSplash = false;
          if(result.data.ResponseCode == RESPONSECODE.Ok) {
            vm.detail = result.data.Dto;
          } else if(result.data.ResponseCode == RESPONSECODE.NoDataDB) {
            vm.detail = null;
          } else {
            toastr('','Có lỗi xảy ra!');
          }
        });
        $rootScope.showSplash = true;
        // get post by user
        userService.getPostByUser(id).then(function(result) {
          $rootScope.showSplash = false;
          if(result.data.ResponseCode == RESPONSECODE.Ok) {
            vm.posts = result.data.Dtos;
          } else if(result.data.ResponseCode == RESPONSECODE.NoDataDB) {
            vm.posts = null;
          }
          else {
            toastr.error('','Lỗi kết nối mạng!');
          }
        });
        $rootScope.showSplash = true;
        //get ablumn photo by user
        userService.getAblumnByUser(id).then(function(result) {
          $rootScope.showSplash = false;
          if(result.data.ResponseCode == RESPONSECODE.Ok) {
            vm.Ablums = result.data.Dtos;
          } else if(result.data.ResponseCode == RESPONSECODE.NoDataDB) {
            vm.Ablums = null;
          } else {
            toastr('',"Lỗi kết nối mạng!");
          }
        });
        $rootScope.showSplash = true;
        //get list friend by user
        userService.getFriendByUser(id).then(function(result) {
          $rootScope.showSplash = false;
          if(result.data.ResponseCode == RESPONSECODE.Ok) {
            console.log(result.data.Dtos)
            vm.friends = result.data.Dtos;
          } else if(result.data.ResponseCode == RESPONSECODE.NoDataDB) {
            vm.friends = null;
          } else {
            toastr('','Có lỗi xảy ra!');
          }
        });
        $rootScope.showSplash = true;
        //get list notified by user
        userService.getNotifiedByUser(id).then(function(result) {
          $rootScope.showSplash = false;
          if(result.data.ResponseCode == RESPONSECODE.Ok){
            vm.notifieds = result.data.Dtos;
          } else if(result.data.ResponseCode == RESPONSECODE.NoDataDB) {
            vm.notifieds = null;
          } else {
            toastr('','Có lỗi xảy ra!');
          }
        });
      });
    }

    function OpenAlbumPhoto(Id) {
      var modalOpenAblumPhoto = $uibModal.open({
        animation: true,
        templateUrl: 'OpenAblumPhoto.html',
        controller: 'OpenAblumPhotoCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          ablums: function() {
            return vm.Ablums;
          },
          idPhoto: function() {
            return Id;
          }

        }
      });
    }

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
        size: 'xl',
        resolve: {
          detail: function() {
            return vm.detail;
          }
        }
      });
    }

    function OpenSlide(idPost) {
      var modalOpenSlide = $uibModal.open({
        animation: true,
        templateUrl: 'OpenSlide.html',
        controller: 'OpenSlideCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          posts: function() {
            return vm.posts;
          },
          idPost: function() {
            return idPost;
          }

        }
      });
    }
  }

  var OpenEditProfileCtrl = 'OpenEditProfileCtrl';
  angular.module('app.user')
  .controller(OpenEditProfileCtrl,['$scope', '$uibModalInstance', '$cookies', '$uibModal', 'userService',
  '$rootScope', 'RESPONSECODE', '$window', 'detail',OpenEditProfileFunction]);

  function OpenEditProfileFunction($scope, $uibModalInstance, $cookies, $uibModal, userService, $rootScope, RESPONSECODE,
    $window, detail) {
    var vm = this;
    vm.isShowEditAbout = false;
    var expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 12);
    vm.detail = angular.copy(detail);

    vm.cancel = cancel;
    vm.currentUser = JSON.parse($cookies.get("user"));
    vm.About = vm.currentUser.About;
    vm.EditAvatar = EditAvatar;
    vm.EditCover = EditCover;
    vm.EditAbout = EditAbout;
    vm.SubmitUpdateAbout = SubmitUpdateAbout;

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
        size: 'xl',
        resolve: {
          detail: function() {
            return detail;
          },//profile
          detail1: function() {
            return vm.detail;
          } // edit profie
        }
      });
    }

    function EditCover() {
      var modalEditCover = $uibModal.open({
        animation: true,
        templateUrl: 'OpenEditCover.html',
        controller: 'OpenEditCoverCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'xl'
      });
    }

    function EditAbout() {
      vm.isShowEditAbout = !vm.isShowEditAbout;
    }

    function SubmitUpdateAbout() {
      $rootScope.showSplash = true;
      userService.SubmitUpdateAbout(vm.About, id).then(function(result) {
        $rootScope.showSplash = false;
        if(result.data.ResponseCode == RESPONSECODE.Ok) {
          toastr.success("","Cập nhật thành công");
          $window.location.reload();
        } else {
          toastr.error("","Cập nhật thất bại")
        }
      });
    }
  }

  var OpenEditAvatarCtrl = 'OpenEditAvatarCtrl';
  angular.module('app.user')
  .controller(OpenEditAvatarCtrl,['$scope', '$uibModalInstance', '$cookies', 'userService', '$rootScope',
  'RESPONSECODE', '$window', 'detail', 'detail1',OpenEditAvatarFunction]);

  function OpenEditAvatarFunction($scope, $uibModalInstance, $cookies, userService, $rootScope, RESPONSECODE, $window,
  detail, detail1) {
    var vm = this;

    vm.cancel = cancel;
    vm.SubmitAvatarProfile = SubmitAvatarProfile;

    vm.currentUser = JSON.parse($cookies.get("user"));
    var expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 12);
    vm.detail = angular.copy(detail);

    vm.PreviewImage = vm.detail.Avatar;
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

      vm.Image = vm.PreviewImage.slice(vm.PreviewImage.indexOf('base64,') + 7);

      userService.SubmitAvatarProfile(vm.Image, vm.currentUser.Id).then(function(result) {
        $rootScope.showSplash = false;
        if(result.data.ResponseCode == RESPONSECODE.Ok) {
          toastr.success("","Cập nhật thành công");
          $uibModalInstance.dismiss('cancel');
          detail.Avatar = result.data.Dto;
          detail1.Avatar = result.data.Dto;
          //update avatarr in cookies
          vm.currentUser.Avatar = result.data.Dto;
          $cookies.put("user", JSON.stringify(vm.currentUser), {'expires': expirationDate });
          $rootScope.currentUser = vm.currentUser;
        } else {
          toastr.error("","Cập nhật thất bại")
        }
      });
    }
  }

  var OpenEditCoverCtrl = 'OpenEditCoverCtrl';
  angular.module('app.user')
  .controller(OpenEditCoverCtrl,['$scope', '$uibModalInstance', '$cookies', 'userService', '$rootScope',
  'RESPONSECODE', '$window',OpenEditCoverFunction]);
  function OpenEditCoverFunction($scope, $uibModalInstance, $cookies, userService, $rootScope, RESPONSECODE, $window) {
    var vm = this;

    vm.cancel = cancel;
    vm.SubmitCoverProfile = SubmitCoverProfile;

    vm.currentUser = JSON.parse($cookies.get("user"));
    var expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 12);

    vm.PreviewImage = vm.currentUser.CoverImage;
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

    function SubmitCoverProfile() {
      $rootScope.showSplash = true;

      vm.Image = vm.PreviewImage.slice(vm.PreviewImage.indexOf('base64,') + 7);

      userService.SubmitCoverProfile(vm.Image, vm.currentUser.Id).then(function(result) {
        $rootScope.showSplash = false;
        if(result.data.ResponseCode == RESPONSECODE.Ok) {
          toastr.success("","Cập nhật thành công");
          $window.location.reload();
        } else {
          toastr.error("","Cập nhật thất bại")
        }
      });
    }
  }

  var OpenSlideCtrl = 'OpenSlideCtrl';
  angular.module('app.user')
  .controller(OpenSlideCtrl,['$scope','$uibModalInstance', 'posts', 'idPost', 'common', OpenSlideFunction]);
  function OpenSlideFunction($scope, $uibModalInstance, posts, idPost, common) {
    var vm = this;
    vm.cancel = cancel;
    vm.idPost = angular.copy(idPost);
    vm.posts = angular.copy(posts);

    activate();

    function activate() {
      common.activateController([], 'OpenEditCoverCtrl')
      .then(function() {
        vm.posts.forEach(post => {
          if(post.Id == vm.idPost) {
            vm.post = post;
          }
        });
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }

  var OpenAblumPhotoCtrl = 'OpenAblumPhotoCtrl';
  angular.module('app.user')
  .controller(OpenAblumPhotoCtrl,['$scope','$uibModalInstance', 'ablums', 'idPhoto', 'common', OpenAblumPhotoFunction]);
  function OpenAblumPhotoFunction($scope, $uibModalInstance, ablums, idPhoto, common) {
    var vm = this;
    vm.cancel = cancel;
    vm.idPhoto = angular.copy(idPhoto);
    vm.ablums = angular.copy(ablums);

    activate();

    function activate() {
      common.activateController([], 'OpenAblumPhotoCtrl')
      .then(function() {
        vm.ablums.forEach(album => {
          if(album.Id == vm.idPhoto) {
            vm.album = album;
          }
        });
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
