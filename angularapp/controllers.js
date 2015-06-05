'use strict';

var ctrls = angular.module('haoshiyou.controllers', []);

ctrls.controller('PostListCtrl', function ($scope, HaoshiyouService) {
    $scope.list = HaoshiyouService.posts();
});

ctrls.controller('PostItemCtrl', function ($scope, $http, $routeParams, HaoshiyouService) {
    var id = $routeParams.id;
    $scope.item = HaoshiyouService.post(id);
});
