jQuery(function ($) {
    "use strict";
    function init() {
        var CONST_PARSE_ID = "RPjt04MBMl3rzzEKBGKUpP7KHFXAsomtDbr9cS0y";
        var CONST_PARSE_KEY = "DSqWg9xElC6mI1PwtPWzzeIPQYUXPGTOC66nT82h";

        Parse.initialize(CONST_PARSE_ID, CONST_PARSE_KEY);
        zHelper.trackerFunctions["woopra"] = function(action, dimensions) {
            woopra.track(action, dimensions);
        };
        zHelper.trackerFunctions["ga"] = function(action, dimensions) {
            ga('send', 'event', 'button', 'click', action, dimensions);
        };
        zHelper.trackerFunctions["ga"] = function(action, dimensions) {
            ga('send', 'event', 'button', 'click', action, dimensions);
        };

        zHelper.trackerFunctions["parse"] = function(action, dimensions) {
            var ParseTracking = Parse.Object.extend("ParseTracking");
            var parseTracking = new ParseTracking();
            for(var key in dimensions) {
                parseTracking.set(key, dimensions[key]);
            }
            parseTracking.set("action", action);
            parseTracking.save();
        };
        zHelper.loggerFunctions["parse"] = function(msg, level, data) {
            var ParseLogging = Parse.Object.extend("ParseLogging");
            var parseLogging = new ParseLogging();
            parseLogging.set("msg", msg);
            parseLogging.set("level", level);
            for(var key in data) {
                parseLogging.set(key, data[key]);
            }
            parseLogging.save();
        };

        $.getJSON("http://www.telize.com/geoip?callback=?",
            function (data) {
                zHelper.geoInfo.ip = data.ip;
                zHelper.geoInfo.city = data.city;
                zHelper.geoInfo.country = data.country;
                zHelper.track("loaded-geo-info");
            }
        );
    }

    function setFooterButtons() {
        $(".zzn-panel-footer-button").click(function(e){
            var action = $(this).attr("data-track-action");
            var row = $(this).attr("data-row");
            zHelper.log("panel footer button " + action + " clicked. row:" + row);
            zHelper.track(action, "panel footer button " + action + " clicked. row:" + row, {row: row});
            $('#notReadyModal').find("#feature").text(action);
            $('#notReadyModal').modal();
        });
    };


    function setDownloadScreenshot() {
        $("#download_image_btn").click(function() {
            zHelper.log("clicked download screenshot");
            zHelper.track("screenshot");
            html2canvas($("#value_panel_parent"), {
                onrendered: function(canvas) {
                    Canvas2Image.saveAsJPEG(canvas);
                }
            });
        });
    };
    function main() {
        init();

        // Init view
        zHelper.log("track view");
        zHelper.track("view");

        var controller = new PostItemMVC.Controller();
        var guid = $.url().param("guid");
        $("#loading_panel").show();

        controller.initAsync(function(){
            if (guid) {
                $(".wechat_qr_code").hide();
                guid = guid.replace(/\/$/,'');
                controller.showItemByGuid(guid);
            } else {
                $("#download_button_panel").hide();
                controller.showAllItems();
            }
            $("#loading_panel").hide();
        });

        setFooterButtons();
        setDownloadScreenshot();

    };

    $(document).ready(function () {
        main();
    });
});