'use strict';

var ctrls = angular.module('haoshiyou.controllers', ['ngResource', 'lbServices']);

ctrls.controller('MainCtrl', function($log, $rootScope, User, $scope) {

  $scope.logout = function() {
    console.log("Logout!");
    User.logout()
        .$promise
        .then(function () {
          $rootScope.session = null;
        })
        .catch(function (err) {
          console.log(err);
        });
  }
});

ctrls.controller('DashCtrl', function($log, $scope, HaoshiyouService) {
  $scope.title = "Home";
  HaoshiyouService.postsP()
      .then(function(data) {
        $scope.posts = data;
      });
});

ctrls.controller('MyCtrl', function($log, $scope, HsyPost) {
  $scope.title = "My";
  HsyPost.find()
      .$promise
      .then(function(results) {
        $log.info("xxx getting my!");
        $scope.posts = results;

        $log.info("xxx error  getting my!");
      }).catch(function(err) {
        $log.error(JSON.stringify(err));
      });
});

ctrls.controller('TeamCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:

  var TEAM_DATA = [{
    id: 0,
    name: 'Zainan',
    intro: 'Developer',
    face: 'img/zainan.jpg'
  },
  {
    id: 1,
    name: 'Shasha',
    intro: 'Community Manager',
    face: 'img/shasha.jpg'
  },
  {
    id: 2,
    name: 'Xudong',
    intro: 'Community Manager',
    face: 'img/xudong.jpg'
  },
  {
    id: 3,
    name: 'Gengchao',
    intro: 'Community Manager',
    face: 'img/gengchao.jpg'

  },
  {
    id: 4,
    name: 'Xiaohan',
    intro: 'UX Designer',
    face: 'img/xiaohan.jpg'
  },
  {
    id: 4,
    name: 'Lin',
    intro: 'Visual Designer',
    face: 'img/lin.jpg'
  }];
  $scope.$on('$ionicView.enter', function(e) {
    $scope.team = TEAM_DATA;
  });
});

ctrls.controller('DetailCtrl', function($log, $scope, $stateParams, HaoshiyouService, uiGmapGoogleMapApi) {
  $scope.SHOW_COLUMNS_AND_ICONS = [
    ['qssj', 'ion-calendar'],
    ['ybhzcs', 'ion-location'],
    ['yqjg', 'ion-cash'],
  ];

  //$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  $scope.post = HaoshiyouService.post($stateParams.guid);
  $scope.showMap = false;
  $scope.$watch("post.ybhzcs", function(newValue){
    if (newValue) {
        $log.info("map api ready");
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          "address": newValue
        }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            $log.info("address: " + newValue);
            var location = results[0].geometry.location;
            $scope.map = {center: {latitude: location.lat(), longitude: location.lng() }, zoom: 14 };
            $scope.options = {scrollwheel: false};
            $scope.marker = {
              id: 0,
              coords: {
                latitude: location.lat(),
                longitude: location.lng()
              },
              options: { draggable: false }
            };
            $scope.showMap = true;
          }
          else {
            $scope.showMap = false;
          }
        });
    }

  });

});

ctrls.controller('QrCodeCtrl', function($scope) {
  $scope.qrcodes = ['dw', 'dz', 'nw', 'sf', 'zbd'];
});

ctrls.controller('EditCtrl', function($scope, HsyPost, $log) {
  $scope.editData = {};
  $scope.rows = [
    {key: 'start_date', icon:'ion-calendar', placeholder: 'Start Date'},
    {key: 'location', icon:'ion-location', placeholder: 'Location'},
    {key: 'price', icon:'ion-cash', placeholder: 'Price'},
    {key: 'intro', icon:'ion-ios-compose', placeholder: 'Introduction'}
  ];
  $scope.create = function() {
    HsyPost.create($scope.editData)
        .$promise
        .then(function(data) {
          $log.info("Success posting");
          $log.info(data);
        })
        .catch(function(err) {
          $log.error(err);
        });
  };

});

ctrls.controller('LoginCtrl', function($scope, User, $rootScope) {
  $scope.data = {};

  $scope.login = function() {
    User.login({email: 'foo@bar.com', password: 'bar'})
        .$promise
        .then(function(session) {
          console.log(session);
          $rootScope.session = session;
    }).catch(function(err) {
      console.log(err);
    });
  };
  $scope.register = function() {
    User.create({email: 'foo@bar.com', password: 'bar'})
        .$promise.then(function(user) {
          console.log(user);
        }).catch(function(err) {
          console.log(err);
        });
  };
});
