'use strict';

var services = angular.module('haoshiyou.services', ['ngResource', 'lbServices']);

function ConstantSerivce() {
  return {
    FIELDS: [
      { key: 'needType', label:'需求类型', icon: 'ion-star',
        required: true, type: 'radio', options: ['招租', '求租', '找室友']
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
      },
      { key: 'geopointFromLocation', hide: true,
      },
      { key: 'radiusInMiles', hide: true,
      },
      { key: 'images', hide: true,
      }
    ],
    BEFORE_MIGRATION_SESSION_ID: "before-migration-session-id",
    NEED_TYPE_COLOR: {
      "招租" : "balanced",
      "求租" : "positive",
      "找室友": "energized"
    }
  }
}
services.factory('ConstantService', ConstantSerivce);

function WeChatService($http, $log, $q, $location, backendHostAndPort) {
  var ready = false;
  function init() {
    var signatureServer= "http://" + backendHostAndPort + "/wechatsig";

    // Step 1: get access token
    return $http({
      url: signatureServer,
      method: 'GET',
      params: {
        url: $location.absUrl().split('#')[0]
      }
    }).then(function (result) {
      var options = result.data.data;
      options.debug = true;
      options.jsApiList = [
        'checkJsApi',
        "onMenuShareTimeline",
        "onMenuShareAppMessage"
      ];
      $log.info(options);
      var deferred = $q.defer();
      wx.config(options);
      wx.error(function (res) {
        deferred.reject(res.errMsg);
      });

      wx.ready(function (res) {
        deferred.resolve(res);
      });
      return deferred.promise;
    }).then(function (res) {
      $log.info("before check js api");
      var deferred = $q.defer();
      wx.checkJsApi({
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage"
        ],
        success: function (res) {
          $log.info("Check JsAPI success!");
          $log.info(res);
          ready = true;
          deferred.resolve(res);
        }
      });
      return deferred.promise;
    }).catch(function(err){
      $log.error(err);
    });
  }
  return {
    init: init,
    ready: ready
  };
}
services.factory('WeChatService', WeChatService);


services.factory('HaoshiyouService', function ($log, $cacheFactory, $http, $q) {
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
              var stored = myCache.get("entries");
              return stored;
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
      });
      return this;
    }
  }
});


services.factory('SessionService', function(){
  var sessionId;
  function getSessionId() {
    if (sessionId) {
      return sessionId;
    } else {
      sessionId = "debug-session-id";
      return sessionId;
    }
  };
  return {
    getSessionId: getSessionId
  };
});