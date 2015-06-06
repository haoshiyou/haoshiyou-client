'use strict';

var ctrls = angular.module('haoshiyou.controllers', []);

ctrls.controller('PostListCtrl', function ($scope, HaoshiyouService) {
    $scope.list = HaoshiyouService.posts();
});

ctrls.controller('PostItemCtrl', function ($scope, $http, $routeParams, HaoshiyouService) {
    var id = $routeParams.id;
    $scope.item = HaoshiyouService.post(id);

    $scope.STYLES = {
        "a": "panel-success",
        "求租": "panel-primary",
        "找室友": "panel-warning"
    };
});

ctrls.controller('GroupsCtrl', function ($scope, $http, $routeParams, HaoshiyouService) {

    $scope.groups = {
        "dz": "短租",
        "nw": "南湾",
        "zbd": "中半岛",
        "dw":"东湾",
        "sf":"三番",
    };
});


