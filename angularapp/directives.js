'use strict';

var directives = angular.module('haoshiyou.directives', []);

directives.directive('postItem', function() {
    return {
        restrict: "A",
        templateUrl: 'partials/post_item.html'
    }
});
