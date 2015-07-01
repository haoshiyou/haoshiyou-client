'use strict';

var ctrls = angular.module('haoshiyou.controllers', ['ngResource', 'lbServices']);

function MainCtrl($rootScope, User, $scope) {
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
}
ctrls.controller('MainCtrl', MainCtrl);

function DashCtrl($scope, HaoshiyouService) {
  $scope.title = "Home";
  HaoshiyouService.postsP()
      .then(function(data) {
        $scope.posts = data;
      });
}
ctrls.controller('DashCtrl', DashCtrl);

function MyCtrl($log, $scope, HsyPost, $ionicLoading, $ionicPopup, $q, $state) {
  $scope.title = "我的帖子";

  $scope.delete = function(postId){
      var confirmPopup = $ionicPopup.confirm({
          title: '确认删除'
      });
      confirmPopup.then(function(res) {
          if(res) {
              console.log("postId=" + postId);
              HsyPost.findById({id: postId}).$promise.
                  then(function(hsyPost){
                      $log.info(hsyPost);
                      return $q.all([
                          hsyPost,
                          HsyPost.hsyHousePreference.destroy({id: postId}, housePreference),
                          HsyPost.hsyRoommatePreference.destroy({id: postId}, roommatePreference),
                      ]);
                  }).then(function(results){
                      var hsyPost = results[0];
                      $log.info(results);
                      return hsyPost.$delete();
                  }).then(function(){
                      $ionicLoading.show({ template: '已删除', noBackdrop: true, duration: 1500 });
                      $scope.reload(); // no chaining
                  })
                  .catch(function(err){
                      $log.error(err);
                      $ionicLoading.show({ template: '删除失败', noBackdrop: true, duration: 1500 });
                  });
              //$q.all([
              //    HsyPost.deleteById({id: postId}).$promise,
              //    HsyPost.hsyRoommatePreference.destroyAll({postId: postId}).$promise,
              //    HsyPost.hsyHousePreference.destroyAll({postId: postId}).$promise,
              //]).then(function(){
              //      $ionicLoading.show({ template: '已删除', noBackdrop: true, duration: 1500 });
              //      $scope.reload(); // no chaining
              //    }).catch(function(err){
              //        $log.error(err);
              //    });
          } else {
          }
      });
  };

  $scope.edit = function(postId){
    $log.info("edit " + postId);
    $state.go("tab.edit", {postId: postId});
  };
  $scope.reload = function () {
      return HsyPost.find()
          .$promise
          .then(function (results) {
              $log.info("Getting my posts:" + results.length);
              $log.info(results);
              $scope.posts = results;
          }).catch(function (err) {
              $log.error("Error getting my posts!");
              $log.error(JSON.stringify(err));
          });
  };
}
ctrls.controller('MyCtrl', MyCtrl);

function DetailCtrl($log, $scope, $stateParams, HaoshiyouService, uiGmapGoogleMapApi) {
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
}
ctrls.controller('DetailCtrl', DetailCtrl);

function LoginCtrl($scope, User, $rootScope) {
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
}
ctrls.controller('LoginCtrl', LoginCtrl);

function ViewPostCtrl($scope) {
  $scope.SHOW_COLUMNS_AND_ICONS = [
    ['qssj', 'ion-calendar'],
    ['ybhzcs', 'ion-location'],
    ['yqjg', 'ion-cash']
  ];
}
ctrls.controller('ViewPostCtrl', ViewPostCtrl);
