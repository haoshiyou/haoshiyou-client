'use strict';

var ctrls = angular.module('haoshiyou.controllers', []);

ctrls.controller('ListPageCtrl', ["$scope", function($scope) {
    $scope.items = [
        {
            fbsj : '2015-01-01',
            qssj : '2015-02-01'
        },
        {
            fbsj : '2015-03-01',
            qssj : '2015-04-01'
        }
    ]
}]);