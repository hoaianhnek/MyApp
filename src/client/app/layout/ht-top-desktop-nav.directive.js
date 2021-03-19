(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('htTopDesktopNav', htTopDesktopNav);

  /* @ngInject */
  function htTopDesktopNav() {
    var directive = {
      bindToController: true,
      controller: TopDesktopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '='
      },
      templateUrl: 'app/layout/ht-top-desktop-nav.html'
    };

    TopDesktopNavController.$inject = ['$scope','$cookies', '$rootScope'];

    /* @ngInject */
    function TopDesktopNavController($scope, $cookies, $rootScope) {
      var vm = this;
      // vm.currentUser = JSON.parse($cookies.get("user"));
      $scope.isCollapsed = true;
      $scope.isShowDropdown = false;
      $scope.isShowSearch = false;
      vm.haveHeader = $rootScope.haveHeader;
      active();
      function active() {
        $rootScope.$watch('haveHeader', function(newValue, oldValue) {
          if($cookies.get("user") != undefined) {
            vm.currentUser = JSON.parse($cookies.get("user"));
            console.log('user current:',vm.currentUser)
          }
        });
      }
      $scope.Logout = function() {
        $rootScope.showSplash = true;
        localStorage.removeItem("user");
        $cookies.remove("user");
        window.location.reload();
        $rootScope.showSplash = false;
      }
      $scope.showDropdownMessage = function() {
        if($scope.isShowDropdown == true)
          $scope.isShowDropdown = false;
        if($scope.isShowProfile == true) {
          $scope.isShowProfile = false;
        }
        if($scope.isShowSearch == true) $scope.isShowSearch == false;
        $scope.isShowDropdownMessage = !$scope.isShowDropdownMessage;
      }
      $scope.showDropdown = function() {
        if($scope.isShowDropdownMessage == true) {
          $scope.isShowDropdownMessage = false;
        }
        if($scope.isShowProfile == true) {
          $scope.isShowProfile = false;
        }
         if($scope.isShowSearch == true) $scope.isShowSearch == false;
        $scope.isShowDropdown = !$scope.isShowDropdown;
      }
      $scope.showDropdownProfile = function() {
        if($scope.isShowDropdownMessage == true) {
          $scope.isShowDropdownMessage = false;
        }
        if($scope.isShowDropdown == true) {
          $scope.isShowDropdown = false;
        }
        if($scope.isShowSearch == true) $scope.isShowSearch == false;
        $scope.isShowProfile = !$scope.isShowProfile;
      }
      $scope.showSearch = function() {
        if($scope.isShowDropdownMessage == true) {
          $scope.isShowDropdownMessage = false;
        }
        if($scope.isShowDropdown == true) {
          $scope.isShowDropdown = false;
        }
        if($scope.isShowProfile == true) $scope.isShowProfile = false;
        $scope.isShowSearch = !$scope.isShowSearch;
      }
    }

    return directive;
  }
})();
