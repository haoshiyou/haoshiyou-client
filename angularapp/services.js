'use strict';

var services = angular.module('haoshiyou.services', []);
var CONST_SPREADSHEET_URL = "https://spreadsheets.google.com/feeds/list/1vzugrYLpgXmFODqysSx331Lhq8LpDQGJ4sQtwSMrtV4/1/public/values?alt=json&callback=JSON_CALLBACK";
var CONST_FIELD_KEYS = {
    xq: "gsx$需求类别",
    qssj: "gsx$预计起始日期超过这个日期本条信息失效",
    qy: "gsx$区域",
    ybhzcs: "gsx$邮编或者城市",
    yqjg: "gsx$预期价格美元每月",
    grjs: "gsx$租房需求介绍和自我介绍",
    wxId: "gsx$微信号",
    xb: "gsx$性别",
    dhyx: "gsx$其他联系方式电话邮箱等",
    fbsj: "gsx$timestamp",
    ltst: "gsx$shorttermorlongterm",
    entryid: "gsx$entryid"
};
var CONST_FIELDS = [
    'xq', 'qssj', 'qy', 'ybhzcs', 'yqjg', 'grjs',
    'wxId', 'xb', 'dhyx', 'fbsj', 'ltst'
];

services.factory('HaoshiyouService', function ($log, $cacheFactory, $http, $q) {

    var myCache = $cacheFactory('myCache');

    function loadDataP() {
        return $http.jsonp(CONST_SPREADSHEET_URL, { cache: true })
            .then(function(data){
                $log.info("loade data");
                $log.info(data);
                return data;
            });
    }

    function storeData(json) {
        var cacheEntries = {}; //update data;
        var cacheGuids = [];
        console.log("XXX");

        var data = json.data;
        console.log(data);
        data.feed.entry.forEach(function (row) {
            var guid = row[CONST_FIELD_KEYS.entryid]["$t"] || "N/A";
            var datum = {};
            CONST_FIELDS.forEach(function (fieldName) {
                datum[fieldName] = row[CONST_FIELD_KEYS[fieldName]]["$t"] || "N/A";
            });
            datum.guid = guid;
            cacheEntries[guid] = datum;
            cacheGuids.push(guid);
        });
        myCache.put("entries", cacheEntries);
        myCache.put("guids", cacheGuids);
    }

    return {
        post: function (guid) {
            if (myCache && myCache.get("entries")) {
                var cacheEntries = myCache.get("entries");
                return cacheEntries[guid];
            } else {
                var result = {};
                loadDataP()
                    .then(function(data) {
                        storeData(data);
                        var cacheEntries = myCache.get("entries");
                        angular.copy(cacheEntries[guid], result)
                    })
                return result;
            }
        },
        postsP: function () {
            if (myCache && myCache.get("entries")) {
                var cacheEntries = myCache.get("entries");
                var d = $q.defer();
                d.resolve(cacheEntries);
                return d.promise;
            } else {
                return loadDataP()
                    .then(function(data) {
                        storeData(data);
                        var cacheEntries = myCache.get("entries");
                        return cacheEntries;
                    })
            }
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
