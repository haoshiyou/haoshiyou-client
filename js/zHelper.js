// Requires jQuery
var zHelper = (function($) {
    "use strict";

    var myId = $.cookie("myId") || guid();
    $.cookie("myId", myId);
    var sessionId = guid();
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
        if (isDebug()) {
            console.log(level + " | " + new Date() + " | " + msg + " | " + JSON.stringify(data || {}));
        }
        for (var key in loggerFunctions) {
            var logger = loggerFunctions[key];
            logger(msg, level, $.extend(data,{client_id: myId, session_id: sessionId, is_debug: isDebug()}));
        }
    }

    function isDebug() {
        if ($.url().param("debug") == 1) {
            return true;
        }
        if (myId === "12d506b1-5d1c-6d4b-10dc-0789815264d8" ||
            myId === "zzn-mac" ||
            myId === "zzn-mac-local" ||
            myId === "eb56ba79-92e5-9fd4-2918-930a1bad4943" ||
            myId === "b9640001-2f59-f47f-d36a-b8178e5dfb5a") {

            return true
        } else {
            return false;
        }
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
        if (value !== true) {
            console.log("value = " + value, msg);
        }
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
        assert: assert
    };
})($);
