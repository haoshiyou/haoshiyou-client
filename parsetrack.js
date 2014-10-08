Parse.initialize("RPjt04MBMl3rzzEKBGKUpP7KHFXAsomtDbr9cS0y", "DSqWg9xElC6mI1PwtPWzzeIPQYUXPGTOC66nT82h");

var myId = $.cookie("myId") || guid();
$.cookie("myId", myId);
var isDebug = function(id) {
    if ($.url().param("debug") == 1) {
        console.log("url param is debug.");
        return true;
    }
    if (id === "12d506b1-5d1c-6d4b-10dc-0789815264d8" ||
        id === "zzn-mac" ||
        id === "zzn-mac-local" ||
        id === "eb56ba79-92e5-9fd4-2918-930a1bad4943" ||
        id === "b9640001-2f59-f47f-d36a-b8178e5dfb5a") {

        return true
    } else {
        return false;
    }
}
var parseTrack = function(action, data) {
    var ParseTracking = Parse.Object.extend("ParseTracking");
    var parseTracking = new ParseTracking();
    var debug = isDebug(myId);
    var timestamp = new Date();
    parseTracking.set("client_id", myId);
    parseTracking.set("isDebug", debug);
    parseTracking.set("location", $.url().attr("source"));
    parseTracking.set("userAgent", navigator.userAgent);
    parseTracking.set("timestamp", timestamp);
    parseTracking.set("action", action);
    parseTracking.set("data", data);
    parseTracking.save().then(function() {
        // Do Nothing
    });

    Parse.Analytics.track(action, {
        client_id: myId,
        isDebug: debug.toString(),
        location: $.url().attr("source"),
        userAgent: navigator.userAgent,
        timestamp: timestamp.toUTCString()
        //data: JSON.stringify(data)
    });
};