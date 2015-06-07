'use strict';

var ctrls = angular.module('haoshiyou.controllers', []);

ctrls.controller('DashCtrl', function($log, $scope, HaoshiyouService) {
  HaoshiyouService.postsP()
      .then(function(data) {
        $log.info("XXXX Got data!");
        $log.info(data);
        $scope.posts = data;
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
    face: 'http://me.zzn.im/images/zzn_profile.jpg'
  },
  {
    id: 1,
    name: 'Shasha',
    intro: 'Community Manager'
  },
  {
    id: 2,
    name: 'Xudong',
    intro: 'Community Manager'
  },
  {
    id: 3,
    name: 'Gengchao',
    intro: 'Community Manager'

  },
  {
    id: 4,
    name: 'Xiaohan',
    intro: 'UX Designer'
  },
  {
    id: 4,
    name: 'Lin',
    intro: 'Visual Designer'
  }];
  $scope.$on('$ionicView.enter', function(e) {
    $scope.team = TEAM_DATA;
  });
});

ctrls.controller('DetailCtrl', function($log, $scope, $stateParams, HaoshiyouService, uiGmapGoogleMapApi) {
  $scope.SHOW_COLUMNS_AND_ICONS = [
    ['kssj', 'ion-calendar'],
    ['ybhzcs', 'ion-location'],
    ['yqjg', 'ion-cash'],
  ];
  //$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  $scope.post = HaoshiyouService.post($stateParams.guid);
  $scope.showMap = false;
  $scope.$watch("post.ybhzcs", function(newValue){
    if (newValue) {
        console.log("xxx map api ready");
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

ctrls.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
