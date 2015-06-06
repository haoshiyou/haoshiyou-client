'use strict';

var services = angular.module('haoshiyou.services', []);

services.factory('HaoshiyouService', function ($q) {
    var fakeData = [
        { xq: "求租", fbsj: "2015-01-01"},
        { xq: "招租", fbsj: "2015-02-01"}
    ];
    return {
        post: function (id) {
            return fakeData[id];
        },
        posts: function (params) {
            var deferred = $q.defer();
            deferred.resolve(fakeData);
            return deferred.promise;
        }
    }
});

services.factory('PagedResult', function (HaoshiyouService) {
    return function PagedResult (method, arg, collection_name) {
        var self = this;
        self.page = 0;
        var collection = this[collection_name] = [];

        this.loadNextPage = function () {
            HaoshiyouService[method](arg, {page: self.page + 1}).then(function (data){
                self.page = data.data.page;
                self.pages = data.data.pages;
                self.per_page = data.data.per_page;
                [].push.apply(collection, data.data[collection_name])
            })

            return this;
        }
    }

})
