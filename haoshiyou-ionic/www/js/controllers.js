'use strict';

var ctrls = angular.module('haoshiyou.controllers', []);

ctrls.controller('DashCtrl', function($log, $scope, HaoshiyouService) {


  HaoshiyouService.postsP()
      .then(function(data) {
        $log.info("XXXX Got data!");
        $scope.posts = data;

      });

  // TODO(zzn) remove the following test data
  $scope.posts = { "a928e935-1c42-b162-77a0-614865b67446" :{
    "xq": "求租",
    "qssj": "7/1/1980",
    "qy": "南湾",
    "ybhzcs": "sunnyvale / mtv/ santa clara / curpertino",
    "yqjg": "N/A",
    "grjs": "女生，少做饭。想找一个 一室一厅，或者带卫生间的主卧。 长租半年到一年左右。希望找有车库，有洗衣机，烘干机，禁烟的房子。",
    "wxId": "irisyiying",
    "xb": "Female",
    "dhyx": "N/A",
    "fbsj": "5/7/2015 19:48:11",
    "ltst": "Long Term (more than 6 months)",
    "guid": "a928e935-1c42-b162-77a0-614865b67446"
  }};
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
