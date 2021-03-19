(function() {
  'use strict';

  angular
    .module('app.newfeed')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'newfeed',
        config: {
          url: '/',
          templateUrl: 'app/newfeed/newfeed.html',
          controller: 'NewFeedController',
          controllerAs: 'vm',
          title: 'NewFeed'
        }
      },
      {
        state: 'peoplenearly',
        config: {
          url: '/PeopleNearly',
          templateUrl: 'app/newfeed/peopleNearly.html',
          controller: 'PeopleNearlyController',
          controllerAs: 'vm',
          title: 'People Nearly'
        }
      },
      {
        state: 'findfriend',
        config: {
          url: '/FindFriend',
          templateUrl: 'app/newfeed/FindFriend.html',
          controller: 'FindFriendController',
          controllerAs: 'vm',
          title: 'People Nearly'
        }
      },
      {
        state: 'message',
        config: {
          url: '/Message',
          templateUrl: 'app/newfeed/Message.html',
          controller: 'MessageController',
          controllerAs: 'vm',
          title: 'People Nearly'
        }
      },
      {
        state: 'Dating',
        config: {
          url: '/Dating',
          templateUrl: 'app/newfeed/Dating.html',
          controller: 'DatingController',
          controllerAs: 'vm',
          title: 'Dating'
        }
      },
      {
        state: 'Infor Dating',
        config: {
          url: '/Infor_Dating',
          templateUrl: 'app/newfeed/InforDating.html',
          controller: 'InforDatingController',
          controllerAs: 'vm',
          title: 'Dating'
        }
      }
    ];
  }
})();
