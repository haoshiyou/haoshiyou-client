'use strict';

var services = angular.module('haoshiyou.services', [
  'ngResource', 'lbServices',
]);

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
      { key: 'wechat', label:'微信', icon: 'ion-chatbubbles',
        type: 'short-text'
      },
      { key: 'house', label:'房屋', icon: 'ion-ios-home-outline',
        type: 'checkbox', options: [
        { key: 'privateBath', label: '独立卫生间' },
        { key: 'designatedParking' , label :'专用停车位' }]
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
      },
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

function WeChatService($http, $q, $location, BACKEND, Logger, SessionService, $filter) {
  var ready = false;
  function init() {
    var signatureServer= "http://" + BACKEND + "/wechatsig";
    return $http({
      url: signatureServer,
      method: 'GET',
      params: {
        url: $location.absUrl().split('#')[0]
      }
    }).then(function (result) {
      var options = result.data.data;
      options.debug = false;
      options.jsApiList = [
        'checkJsApi',
        "onMenuShareTimeline",
        "onMenuShareAppMessage"
      ];
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
      Logger.log("before check js api");
      var deferred = $q.defer();
      wx.checkJsApi({
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage"
        ],
        success: function (res) {
          Logger.log("Check JsAPI success!");
          ready = true;
          deferred.resolve(res);
        }
      });
      return deferred.promise;
    }).catch(function(err) {
      $log.error(err);
    });
  }

  function share(hsyPost) {
    var imgUrl = "http://dev.haoshiyou.org/img/logo-v1-blue-1024sq2.jpg";
    hsyPost.images = hsyPost.images || [];
    if (hsyPost.images.length > 0) {
      imgUrl = "http://res.cloudinary.com/xinbenlv/image/upload/w_300,h_300,c_fill/" + hsyPost.images[0] + ".JPG";
    }
    var wxData = {
      title: $filter('date')(hsyPost.startDate, "yyyy-MM-dd") + "起" + hsyPost.needType,
      link: "http://dev.haoshiyou.org/#/view/" + hsyPost.id + "?sharedBy=" + SessionService.getSessionId(),
      imgUrl: imgUrl,
      desc: hsyPost.introduction,
      trigger: function (res) {
        Logger.log('用户点击发送给朋友');
      },
      success: function (ret) {
        Logger.log("shared!");
        Logger.log("ret=" + JSON.stringify(ret));
      },
      cancel: function (ret) {
        Logger.log("cancel share!");
        Logger.log("ret=" + JSON.stringify(ret));
      }
    };
    wx.onMenuShareAppMessage(wxData);
    wxData.title = wxData.title + "\r\n" + wxData.desc;
    wx.onMenuShareTimeline(wxData);
  }
  return {
    init: init,
    ready: ready,
    share: share
  };
}
services.factory('WeChatService', WeChatService);

function Logger($location, SessionService) {
  "use strict";
  var LOG_LEVELS = {
    VERBOSE: "VERBOSE",
    DEBUG: "DEBUG",
    INFO: "INFO",
    WARNING: "WARNING",
    ERROR: "ERROR"
  };

  var geoInfo = {
    ip: "",
    city: "",
    country: ""
  };

  function log(msg, level, data) {
    // levels VERBOSE ,DEBUG, INFO, WARNING, ERROR,
    if (typeof level == "undefined") {
      level = "INFO"
    }
    console.log(level + " | " + new Date() + " | " + msg + " | " + JSON.stringify(data || {}));

    for (var key in loggerFunctions) {
      var logger = loggerFunctions[key];
      logger(msg, level, $.extend(data,{
        client_id: null, session_id: SessionService.getSessionId(),
        is_debug: isDebug()}));
    }
  }

  function isDebug() {
    if ($location.search()["debug"] == 1) {
      return true;
    } else {
      return false;
    }
  }
  function isAlertOn() {
    if ($.url().param("alert") == 1) {
      return true;
    } else return false;
  }
  if (isDebug()) {
    console.log("zHelper turns on debug mode.");
  }
  var loggerFunctions = {};
  var trackerFunctions = {};

  function track(action, dimensions) {
    var debug = isDebug(myId);
    var timestamp = new Date();
    var commonDim = {};

    commonDim.client_id = myId;
    commonDim.is_debug = debug;
    commonDim.url_location = window.location.toString();
    commonDim.user_agent = navigator.userAgent;
    commonDim.timestamp = timestamp;
    var extendedDim = $.extend(commonDim, dimensions || {}, geoInfo);
    for (var key in trackerFunctions) {
      var func = trackerFunctions[key];
      func(action, extendedDim);
    }

  }

  function assert(value, msg) {
    if (value) {
      // PASS
    } else  {
      zHelper.log("Assert failed!", LOG_LEVELS.ERROR, msg);
      if (isDebug()) {
        console.assert(value, msg);
      }
    }

  }

  function logAlert(msg) {
    if (isDebug() && isAlertOn())
      alert(msg);
    zHelper.log(msg);
  }

  return {
    // A dict{} which key is name of logger, value is logging function to call, same format of log
    loggerFunctions: loggerFunctions,

    // A dict{} which key is name of logger, value is tracking function to call, same format of log
    trackerFunctions: trackerFunctions,

    // A dict{}
    geoInfo: geoInfo,

    log: log,
    track: track,
    isDebug: isDebug,
    assert: assert,
    logAlert: logAlert,
    LOG_LEVELS: LOG_LEVELS
  };
}
services.factory("Logger", Logger);

services.factory('SessionService', function(uuid4){
  var sessionId =  window.$.cookie("sessionId") || uuid4.generate();
  window.$.cookie("sessionId", sessionId);

  function getSessionId() {
      return sessionId;
  }
  return {
    getSessionId: getSessionId
  };
});