(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$rootScope', '$q', 'dataservice', 'logger', 'spinner', 'userService', 'RESPONSECODE',
  '$window', '$location', '$cookies'];
  /* @ngInject */
  function LoginController($rootScope, $q, dataservice, logger, spinner, userService, RESPONSECODE, $window, $location,
  $cookies) {
    var vm = this;
    //variable declare
    vm.people = [];
    vm.title = 'NewFeed';
    $rootScope.haveHeader = false;
    $rootScope.haveSidebar = false;
    vm.isShowVerified = false;
    vm.isShowInforRegister = false;
    vm.errorCodeId = false;
    vm.inputType='password';
    vm.inputTypeCF='password';
    vm.isShowResetPassword = false;
    vm.isShowResetPhone = false;
    vm.isShowVerifiedSignIn = false;
    var expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 12);

    //function declare
    vm.Login = Login;
    vm.Register = Register;
    vm.checkUserCheckExisted = checkUserCheckExisted;
    vm.showPassword = showPassword;
    vm.showPasswordCF = showPasswordCF;
    vm.UpdatePassword = UpdatePassword;

    vm.checkUserCheckExistedUpdatePsw = checkUserCheckExistedUpdatePsw;

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('container-verified', {
            'size': 'invisible'
    });

    function Login() {
      $rootScope.showSplash = true;
      userService.UserSignIn(vm.userName, vm.password).then( function(result) {
        $rootScope.showSplash = false;
        if(result.data.ResponseCode == RESPONSECODE.Ok) {
          toastr.success('','Đăng nhập thành công!');
          console.log(result)
          var userCurrent = {
            Id: result.data.Dto.Id,
            MobilePhone: result.data.Dto.MobilePhone,
            UserName: result.data.Dto.UserName,
            About: result.data.Dto.About,
            Avatar: result.data.Dto.Avatar,
            CoverImage: result.data.Dto.CoverImage
          };
          $cookies.put("user", JSON.stringify(userCurrent), {'expires': expirationDate })
          localStorage.setItem("user", JSON.stringify(userCurrent));
          $location.url('/');
        } else {
          toastr.error('','User hoặc mật khẩu không đúng');
        }
      }).catch((error) => {
        toastr.error('','Có lỗi xảy ra vui lòng đăng nhập lại');
      });
    }
    function checkUserCheckExisted() {
      $rootScope.showSplash = true;
      userService.checkCustomerCheckExisted(vm.mobilePhone).then(function(result) {
        if(result.data.ResponseCode == RESPONSECODE.CustomerNotExisted) {
          vm.isShowVerified = true;
          $rootScope.showSplash = false;
          firebase.auth().signInWithPhoneNumber("+84" + vm.mobilePhone,  window.recaptchaVerifier)
            .then((confirmationResult) => {
              $('input[type=text]').keyup(function() {
                  var code = $('input[name=number-one').val() + $('input[name=number-two').val()
                      + $('input[name=number-three').val() + $('input[name=number-four').val()
                      + $('input[name=number-five').val() + $('input[name=number-six').val();
                  if(code.length == 6) {
                      $rootScope.showSplash = true;
                      confirmationResult.confirm(code).then(function (result) {
                          $('#showError').html('');
                          toastr.success("Mã xác nhận chính xác");
                          sessionStorage.setItem('phone',vm.phoneNumber);
                          // User signed in successfully.
                          return $q.all(confirm).then(function() {
                              vm.isShowInforRegister = true;
                              vm.isShowVerified = false;
                              $rootScope.showSplash = false;
                          });
                      }).catch(function (error) {
                          $rootScope.showSplash = false;
                          vm.errorCodeId = true;
                          $('#showError').html('');
                          $('#showError').append('<p class="text-error text-center" ng-if="vm.errorCodeId">Mã không chính xác</p>');
                      });
                  } else {
                      vm.errorCodeId = true;
                      $('#showError').html('');
                      $('#showError').append('<p class="text-error text-center" ng-if="vm.errorCodeId">Mã không chính xác</p>');
                  }
              });
            });
        } else {
          $rootScope.showSplash = false;
          toastr.error("", "Số điện thoại đã tồn tại!")
        }
      }).catch((error) => {
        $rootScope.showSplash = false;
        toastr.error("", "Mã Otp đã bị chặn");
      });
    }

    function checkUserCheckExistedUpdatePsw() {
      $rootScope.showSplash = true;
      userService.checkCustomerCheckExisted(vm.mobilePhone).then(function(result) {
        if(result.data.ResponseCode == RESPONSECODE.CustomerExisted) {
          vm.isShowVerifiedSignIn = true;
          $rootScope.showSplash = false;
          firebase.auth().signInWithPhoneNumber("+84" + vm.mobilePhone,  window.recaptchaVerifier)
            .then((confirmationResult) => {
              $('input[type=text]').keyup(function() {
                  var code = $('input[name=number-one1').val() + $('input[name=number-two1').val()
                      + $('input[name=number-three1').val() + $('input[name=number-four1').val()
                      + $('input[name=number-five1').val() + $('input[name=number-six1').val();
                  if(code.length == 6) {
                    console.log('huh')
                      $rootScope.showSplash = true;

                      confirmationResult.confirm(code).then(function (result) {
                          $('#showError1').html('');
                          toastr.success("Mã xác nhận chính xác");
                          // User signed in successfully.
                          return $q.all(confirm).then(function() {
                              vm.isShowResetPassword = true;
                              vm.isShowVerifiedSignIn = false;
                              $rootScope.showSplash = false;
                          });
                      }).catch(function (error) {
                          $rootScope.showSplash = false;
                          vm.errorCodeId = true;
                          $('#showError1').html('');
                          $('#showError1').append('<p class="text-error text-center" ng-if="vm.errorCodeId">Mã không chính xác</p>');
                      });
                  } else {
                      vm.errorCodeId = true;
                      $('#showError1').html('');
                      $('#showError1').append('<p class="text-error text-center" ng-if="vm.errorCodeId">Mã không chính xác</p>');
                  }
              });
          });
        } else {
          toastr.error("", "Số điện thoại chưa được đăng ký!")
        }
      }).catch((error) => {
        toastr.error("", "Mã Otp đã bị chặn");
      });
    }

    function Register() {
      $rootScope.showSplash = true;
      var request = {
        MobilePhone: vm.mobilePhone,
        UserName: vm.userName,
        Password: vm.password
      }

      userService.userRegister(request).then(function(result) {
        $rootScope.showSplash = false;
        if(result.data.ResponseCode == RESPONSECODE.Ok) {
          toastr.success("","Đăng ký thành công")
          var userCurrent = {
            Id: result.data.Dto.Id,
            MobilePhone: vm.mobilePhone,
            UserName: vm.userName,
          };
          $cookies.put("user", JSON.stringify(userCurrent), {'expires': expirationDate })
          localStorage.setItem("user", JSON.stringify(userCurrent));
          $location.url('/');
        } else {
          toastr.error("","Đăng ký thất bại")
        }
      });
    }

    function showPassword() {
      if(vm.inputType == 'password') {
          vm.inputType = "text";
      } else {
        vm.inputType = "password";
      }
    }

    function showPasswordCF() {
      if(vm.inputTypeCF == 'password') {
          vm.inputTypeCF = "text";
      } else {
        vm.inputTypeCF = "password";
      }
    }

    function UpdatePassword() {
      $rootScope.showSplash = true;
      userService.UpdatePassword(vm.mobilePhone, vm.password).then( function(result) {
        $rootScope.showSplash = false;
        if(result.data.ResponseCode == RESPONSECODE.Ok) {
          toastr.success("","Cập nhật thành công")
          var userCurrent = {
            Id: result.data.Dto.Id,
            MobilePhone: result.data.Dto.MobilePhone,
            UserName: result.data.Dto.UserName,
            About: result.data.Dto.About,
            Avatar: result.data.Dto.Avatar,
            CoverImage: result.data.Dto.CoverImage
          };
          $cookies.put("user", JSON.stringify(userCurrent), {'expires': expirationDate })
          localStorage.setItem("user", JSON.stringify(userCurrent));
          $location.url('/');
        } else {
          toastr.error("","Cập nhật thất bại")
        }
      });
    }
  }
  angular
    .module('app.user')
    .directive("confirmPassword", function() {
        return {
            require: "ngModel",
            scope: {
                confirmPassword:"=confirmPassword"
            },
            link: function($scope,ele,attr,modelVal) {
                modelVal.$validators.confirmPassword = function(val) {
                    return val == $scope.confirmPassword;
                }
                $scope.$watch("confirmPassword",function() {
                    modelVal.$validate();
                });
            }
        }
    });
})();
