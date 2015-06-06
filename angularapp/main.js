'use strict';

var app = angular.module('haoshiyou' , [
    'haoshiyou.controllers',
    'haoshiyou.filters',
    'haoshiyou.directives',
    'haoshiyou.services',
]);

app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when("/post/:guid", {controller: 'PostItemCtrl', templateUrl: 'partials/post_item.html'} )
            .when("/list", { controller: 'PostListCtrl', templateUrl: 'pages/post_list.html' })
            .when("/groups", { controller: 'GroupsCtrl', templateUrl: 'pages/groups.html' })
            .when("/", { controller: 'EntranceCtrl', templateUrl: 'pages/entrance.html' })
    }]);



