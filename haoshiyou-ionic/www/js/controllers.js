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
        $log.info("xxx getting my posts:" + results.length);
        $log.info(results);
        $scope.posts = results;
      }).catch(function(err) {
        $log.info("xxx error  getting my!");
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

ctrls.controller('EditCtrl', function($log, $scope, $ionicModal, $q, $ionicPopup, $state,
    HsyRoommatePreference, HsyHousePreference, HsyPost) {
  $scope.postInput = {};
  $scope.dirty = {};

  $scope.FIELDS = [
    { key: 'needType', label:'需求类型', icon: 'ion-star',
      required: true, type: 'radio', options: ['招租', '求租']
    },
    { key: 'location', label:'位置', icon: 'ion-location', required: true,
      type: 'location' },
    { key: 'startDate', label:'起始时间', icon: 'ion-calendar', required: true,
      type: 'date'
    },
    { key: 'price', label:'预期价格', icon: 'ion-cash',
      type: 'number' },
    { key: 'house', label:'房屋', icon: 'ion-ios-home-outline',
      type: 'checkbox', options: [
        { key: 'privateBath', label: '独立卫生间' },
        { key: 'designatedParking' , label :'专用停车位' }
      ]
    },
    { key: 'roommate', label: '室友', icon: 'ion-person',
      type: 'checkbox', options: [
        { key: 'lessCooking', label: '少炊' },
        { key: 'noPets', label: '不带宠物' }
    ]},
    { key: 'introduction', label:'情况简介', icon: 'ion-document', required: true,
      type: 'text'
    }
  ];
  // Load the add / change dialog from the given template URL
  $ionicModal.fromTemplateUrl('templates/edit-entry.html', function(modal) {
    $scope.modal = modal;
  }, {
    scope: $scope
  });

  $scope.showModal = function(action) {
    $log.info("modalAction = " + action);
    $scope.modalField = $scope.FIELDS.filter(function(field) {
      return field.key == action;
    })[0];
    $scope.modal.show();
  };

  $scope.done = function() {
    $scope.modal.hide();
  };
  function validate () {
    var valid = true;
    for (var i in $scope.FIELDS) {
      var field = $scope.FIELDS[i];
      if (!field.required || $scope.postInput[field.key]) {
        // Do nothing
        $log.info("field = " + JSON.stringify(field));
      } else {
        valid = false;
      }
    }
    return valid;
  }
  function submitToDataStorePromise() {
    $log.info("submit!");
    $log.info($scope.postInput);
    $log.log("submiting");

    var post = _.omit($scope.postInput, [
      // TODO(zzn): use a better solution instead of hardcoding them here.
      'privateBath', 'designatedParking',
      'lessCooking', 'noPets'
    ]);
    var roommatePreference = _.pick($scope.postInput, ['lessCooking', 'noPets']);
    var housePreference = _.pick($scope.postInput, ['privateBath', 'designatedParking']);

    return HsyPost.create(post).$promise // XXX remove this
        .then(function(hsyPost) {
          $log.info(hsyPost);
          $log.info("444");
          //roommatePreference.postId = hsyPost.id;
          //housePreference.postId = hsyPost.id;
          return $q.all([
            hsyPost.$prototype$__create__hsyRoommatePreference(roommatePreference),
            hsyPost.$prototype$__create__hsyHousePreference(housePreference)
          ]);
        });

  }
  $scope.onSubmit = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: '确认提交'
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.attempted = true;
        if (validate()) {
          submitToDataStorePromise().then(function(){
            $state.go('tab.my');
          });
        } else {
          // Do nothing
          $log.info("invalid, not submiting");
        }
      } else {
        $log.info("cancel on submit, not submiting");
      }
    });
  }
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

ctrls.controller('EditEntryCtrl', function($log, $scope, uiGmapGoogleMapApi) {
  uiGmapGoogleMapApi.then(function(maps){
    $log.info("loaded maps");
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  });
  $scope.currentDate = new Date();

  $scope.datePickerCallback = function (val) {
    if(typeof(val)==='undefined'){
      console.log('Date not selected');
    }else{
      console.log('Selected date is : ', val);
    }
  };
});