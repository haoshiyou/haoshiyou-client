
var WeiXinJsSdkWrapper = (function($, Hashes, wx, zHelper, ParseJsGlobalCache){
    //TODO(zzn): to be replaced by a real secret after development.
    var CONST_APPID = "wx4bf3130f55a3352d";
    var CONST_APPSECRET = "d15f5121f0047d288f1ba81dd0fe7cca";
    var CACHE_DB_NAME = "AuthCache";
    var ACCESS_TOKEN_CACHE_KEY = "ACCESS_TOKEN";
    var JS_API_TICKET_CACHE_KEY = "JSAPI_TICKET";
    var Authenticator = function() {
        this.cacheDb_ = new ParseJsGlobalCache.CacheDb(CACHE_DB_NAME, 600);
        this.nonceStr_ = "85NRI02249025822X184ndd"; //TODO(zzn): use random string each time
    };

    Authenticator.prototype.getAccessTokenAsync_ = function(cb) {
        var that = this;
        this.cacheDb_.cacheReadAsync(ACCESS_TOKEN_CACHE_KEY,
           function(dataRead) {
               if (dataRead !== null) {
                   zHelper.log("Cache hit, already have access token");
                   zHelper.track("CacheHitWeChatAccessToken");
                   cb(dataRead);
               } else {
                   zHelper.log("Cached not hit, requesting access token");
                   zHelper.track("RequestWeChatAccessToken");
                   $.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + CONST_APPID
                       + "&secret=" + CONST_APPSECRET, function (data) {
                       if ("access_token" in data) {
                           zHelper.log("access_token ret", "INFO", JSON.stringify(data));
                           that.cacheDb_.cacheWriteAsync(
                               ACCESS_TOKEN_CACHE_KEY,
                               data.access_token, 7200 * 1000,
                               function (wroteData) {
                                   cb(wroteData);
                           });
                       } else if ("errcode" in data) {
                           zHelper.log("getAccessTokenAsync_ error", "ERROR", data);
                           cb(null);
                       }
                   });
               }
            });
    };

    Authenticator.prototype.getJsApiTokenAsync_ = function(cb) {
        var that = this;
        this.cacheDb_.cacheReadAsync(JS_API_TICKET_CACHE_KEY,
            function(dataRead) {
                if (dataRead !== null) {
                    zHelper.log("Cache hit, already have jsapi_ticket");
                    zHelper.track("CacheHitWeChatJsApiTicket");
                    cb(dataRead);
                    return;
                } else {
                    that.getAccessTokenAsync_(function (accessToken) {
                        zHelper.log("accessToken = " + accessToken);
                        var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + accessToken + "&type=jsapi";
                        zHelper.log("Cache not hit, requesting jsapi_ticket");
                        zHelper.track("RequestWeChatJsApiTicket");
                        $.get(url, function (data) {
                            zHelper.log("jsapi_ticket obj", "INFO", JSON.stringify(data));
                            that.cacheDb_.cacheWriteAsync(
                                JS_API_TICKET_CACHE_KEY,
                                data.ticket, 7200 * 1000,
                                function (wroteData) {
                                    cb(wroteData);
                                });
                            cb(that.cachedJsapiToken_);
                        });
                    });
                }
        });
    };

    Authenticator.prototype.configAsync = function(cb){
        var timestamp = Math.floor(Date.now()/1000);
        var nonceStr = this.nonceStr_;
        var that = this;
        zHelper.log("Start configAsync");
        that.getJsApiTokenAsync_(function(jsApiToken) {
            zHelper.assert(jsApiToken, "jsApiToken should exist" );
            zHelper.assert(nonceStr, "nonceStr should exist" );
            zHelper.assert(timestamp, "timestamp should exist" );
            var msg = [
                "jsapi_ticket=" + jsApiToken,
                "noncestr="  + nonceStr,
                "timestamp=" + timestamp,
                "url=" + window.location.href,
            ].join('&');
            var SHA1 = new Hashes.SHA1;
            var signature = SHA1.hex(msg);

            zHelper.log(msg);
            zHelper.log("XXX signature!");
            zHelper.log(signature);
            zHelper.log("XXX before wx.config ready");
            wx.config({
                debug: zHelper.isDebug(), // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: CONST_APPID, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr:nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名，见附录1
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage"
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            zHelper.log("XXX before ready");
            wx.ready(function(res){
                alert("Wechat Config OK!");
                zHelper.log(res);
                wx.checkJsApi({
                    jsApiList: [
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage"
                    ],
                    success: function (res) {
                        alert("wxCheckJsApi, success");
                        alert(JSON.stringify(res));
                    },
                    fail: function (res) {
                        alert("wxCheckJsApi, faile");
                        zHelper.log(JSON.stringify(res));
                    }
                });

                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
                // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
                // 则可以直接调用，不需要放在ready函数中。
            });

            wx.error(function (res) {
                zHelper.log(res.errMsg);
            });
        });

    };
    var authenticator = new Authenticator();
    return {
        authenticator : authenticator
    };
})($, Hashes, wx, zHelper, ParseJsGlobalCache);