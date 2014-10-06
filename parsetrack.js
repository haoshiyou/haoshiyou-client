Parse.initialize("RPjt04MBMl3rzzEKBGKUpP7KHFXAsomtDbr9cS0y", "DSqWg9xElC6mI1PwtPWzzeIPQYUXPGTOC66nT82h");

var myId = $.cookie("myId") || guid();
$.cookie("myId", myId);
var isDebug = function(id) {
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
    parseTracking.set("client_id", myId);
    parseTracking.set("isDebug", isDebug(myId));
    parseTracking.set("location", purl().attr("source"));
    parseTracking.set("userAgent", navigator.userAgent);
    parseTracking.set("timestamp", new Date());
    parseTracking.set("action", action);
    parseTracking.set("data", data);
    parseTracking.save().then(function() {
        console.log("saved data");
    });
};
console.log("parse initialized");