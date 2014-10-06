Parse.initialize("RPjt04MBMl3rzzEKBGKUpP7KHFXAsomtDbr9cS0y", "DSqWg9xElC6mI1PwtPWzzeIPQYUXPGTOC66nT82h");

var myId = $.cookie("myId") || guid();
$.cookie("myId", myId);
var parseTrack = function(action, data) {
    var ParseTracking = Parse.Object.extend("ParseTracking");
    var parseTracking = new ParseTracking();
    parseTracking.set("client_id", myId);
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