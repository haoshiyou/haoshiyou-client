
var WeiXinJsSdkWrapper = (function($, CryptoJS, wx, zHelper){
    //TODO(zzn): to be replaced by a real secret after development.
    var CONST_APPID = "wx4bf3130f55a3352d";
    var CONST_APPSECRET = "d15f5121f0047d288f1ba81dd0fe7cca";
    var CONST_MS_IN_10MIN = 10 * 60 * 1000;
    var Authenticator = function() {
        this.cachedAccessToken_ = null;
        this.cachedAccessTokenTimeMilliToLive_ = null;
        this.cachedJsapiToken_ = null;
        this.cachedJsApiTokenTimeMilliToLive_ = null;
        this.nonceStr_ = "dsf842093958jdufh469482727";
    };

    Authenticator.prototype.getAccessTokenAsync_ = function(cb) {
        if (this.cachedAccessTokenTimeMilliToLive_ &&
            Date.now() <= this.cachedAccessTokenTimeMilliToLive_ - CONST_MS_IN_10MIN) {
            cb(this.cachedAccessToken_);
        }
        $.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + CONST_APPID
        + "&secret=" + CONST_APPSECRET, function(data) {
            if ("access_token" in data) {
                zHelper.log("access_token ret", "INFO", JSON.stringify(data));
                this.cachedAccessToken_ = data.access_token;
                this.cachedAccessTokenTimeMilliToLive_ = Date.now() +  data.expires_in_ * 1000;
                cb(this.cachedAccessToken_);
            } else if ("errcode" in data) {
                zHelper.log("getAccessTokenAsync_ error", "ERROR", data);
                cb(null);
            }
        });

    };

    Authenticator.prototype.getJsApiTokenAsync_ = function(cb) {
        if (this.cachedJsApiTokenTimeMilliToLive_ &&
            Date.now() <= this.cachedJsApiTokenTimeMilliToLive_ - CONST_MS_IN_10MIN) {
            cb(this.cachedJsapiToken_);
        }
        this.getAccessTokenAsync_(function(accessToken){
            zHelper.log("accessToken = " + accessToken);
            var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + accessToken + "&type=jsapi";
            $.get(url, function(data){
                zHelper.log("jsapi_ticket obj", "INFO", JSON.stringify(data));
                this.cachedJsapiToken_ = data.ticket;
                this.cachedJsApiTokenTimeMilliToLive_ = Date.now() + data.expires_in * 1000;
                cb(this.cachedJsapiToken_);
            });
        });
    };

    Authenticator.prototype.configAsync = function(cb, url){
        var timestamp = Math.floor(Date.now()/1000);
        var nonceStr = this.nonceStr_;

        zHelper.log("Start configAsync");
        wx.ready(function(){
            zHelper.log("Wechat Config OK!");
            console.log("XXX wechat config ok ready");
            cb();
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
            // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
            // 则可以直接调用，不需要放在ready函数中。
        });

        wx.error(function(res){
            zHelper.log("error in wx.config", "ERROR", res);
            cb(null, res);
        });

        this.getJsApiTokenAsync_(function(jsApiToken) {
            var msg = [
                "jsapi_ticket=" + jsApiToken,
                "noncestr="  + nonceStr,
                "timestamp=" + timestamp,
                "url=" + url,
            ].join('&');
            var signature = CryptoJS.SHA1(msg);
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
        });

    };
    var authenticator = new Authenticator();
    return {
        authenticator : authenticator
    }
})($, CryptoJS, wx, zHelper);