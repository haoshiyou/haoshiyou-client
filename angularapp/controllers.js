'use strict';

var ctrls = angular.module('haoshiyou.controllers', []);

ctrls.controller('EntranceCtrl', function($http) {

});

ctrls.controller('PostListCtrl', function ($scope, HaoshiyouService) {
    HaoshiyouService.postsP()
        .then(function(data) {
            console.log(data);
            $scope.items = data;
        });
});

ctrls.controller('PostItemCtrl', function ($scope, $http, $routeParams, HaoshiyouService) {
    var guid = $routeParams.guid;
    $scope.item = HaoshiyouService.post(guid);
    $scope.guid = guid;
    $scope.STYLES = {
        "a": "panel-success",
        "求租": "panel-primary",
        "找室友": "panel-warning"
    };
});

ctrls.controller('GroupsCtrl', function ($scope) {

    $scope.groups = {
        "dz": "短租",
        "nw": "南湾",
        "zbd": "中半岛",
        "dw":"东湾",
        "sf":"三番",
    };
});


