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
    ['yqjg', 'ion-cash']
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

ctrls.controller('EditCtrl', function($scope, $log, $q, $rootScope,
    HsyPost, HsyRoommatePreference, HsyHousePreference) {
  // TODO(zzn): consider move these schema related information to the schema or some where extending schema
  $scope.postInfoTypes = [
    { key: 'needType',  enumType: "需求", required: true, enumValues: ['招租', '求租', '找室友'], },
    { key: 'leaseType', enumType: "租期", required: true, enumValues: ['长租(半年或以上)', '短租(半年以下)'], },
    { key: 'areaType',  enumType: "区域", required: true, enumValues: ['南湾', '三番', '中半岛', '东湾'], }
  ];

  $scope.postInfoRows = [
    {key: 'startDate',    icon:'ion-calendar',    required: true, placeholder: '开始时间'},
    {key: 'location',     icon:'ion-location',    placeholder: '地址'},
    {key: 'price',        icon:'ion-cash',        placeholder: '价格'},
    {key: 'introduction', icon:'ion-ios-compose', required: true, placeholder: '情况介绍'}
  ];

  $scope.roommatePreferenceRows = [
    {key: 'noPets', text: '不带宠物'},
    {key: 'noCooking', text: '少炊'}
  ];

  $scope.housePreferenceRows = [
    {key: 'separatedBath', text: '有独立卫生间'},
    {key: 'designatedParking', text: '有停车位'},
    {key: 'laundryInUnit', text: '屋内有洗衣机和烘干机'}
  ];

  $scope.contactInfoRows = [
    {key: 'wechat',       icon:'fa fa-wechat',   placeholder: '微信号'},
    {key: 'phone',        icon:'fa fa-phone',    placeholder: '电话'},
    {key: 'contactEmail', icon:'fa fa-envelope', placeholder: 'Email'}
  ];

  $scope.postInfoInputs = {};
  $scope.roommatePreferenceInputs = {};
  $scope.housePreferenceInputs = {};
  $scope.contactInfoInputs = {};
  $scope.i = 0;
  $rootScope.$on("wizard:StepFailed", function(event) {
    console.log("XXX wizard:StepFailed");
    console.log(event);
    console.log("XXX wizard:StepFailed done");
  });
  $scope.postInfoRequired = function() {
    for (var i in $scope.postInfoRows) {
      var item = $scope.postInfoRows[i];
      if (item.required && !$scope.postInfoInputs[item.key]) {
        return false;
      }
    };
  };
  $scope.submit = function() {
    $log.log("Submiting");

    $q.all([
      HsyRoommatePreference.create($scope.roommatePreferenceInputs),
      HsyHousePreference.create($scope.housePreferenceInputs),
      HsyPost.create($scope.postInfoInputs)
    ])
    .then(function(results) {
      $log.info(results);
      var hsyPost = results[2];
      hsyPost.hsyRoommatePreference = results[0].id;
      hsyPost.hsyHousePreference = results[1].id;
      return HsyPost.save(hsyPost).$promise;
    })
    .catch(function(err){
        //TODO(zzn) handle error here
        //TODO(zzn): add validation, transaction and rollback
        console.log("error!");
        $log.error(err);
        console.log("error 2!");
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

ctrls.controller('ViewPostCtrl', function($scope) {
  $scope.SHOW_COLUMNS_AND_ICONS = [
    ['qssj', 'ion-calendar'],
    ['ybhzcs', 'ion-location'],
    ['yqjg', 'ion-cash']
  ];
});