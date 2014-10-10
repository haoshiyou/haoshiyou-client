jQuery(function ($) {
    $(document).ready(function () {
        var template = $("#value_panel_template").clone();
        var parent = $("#value_panel_parent").empty();
        var DATA_KEY = "GoogleSheetData-3.1";

        Parse.initialize("RPjt04MBMl3rzzEKBGKUpP7KHFXAsomtDbr9cS0y", "DSqWg9xElC6mI1PwtPWzzeIPQYUXPGTOC66nT82h");
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
        // Init view
        zHelper.log("track view");
        zHelper.track("view");

        $.getJSON("http://www.telize.com/geoip?callback=?",
            function (jsonp) {
                zHelper.geoInfo.ip = jsonp.ip;
                zHelper.geoInfo.city = jsonp.city;
                zHelper.geoInfo.country = jsonp.country;
                zHelper.track("loaded-geo-info");
            }
        );

        // Set up cors proxy for jQuery
        $.ajaxPrefilter(function(options) {
            if(options.crossDomain && jQuery.support.cors) {
                var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                //options.url = "http://cors.corsproxy.io/url=" + options.url;
            }
        });
        var url = "https://spreadsheets.google.com/feeds/list/1vzugrYLpgXmFODqysSx331Lhq8LpDQGJ4sQtwSMrtV4/1/public/values?alt=json";
        var columns = {
            xq: "gsx$需求类别",
            qssj: "gsx$预计起始日期超过这个日期本条信息失效",
            wz: "gsx$位置",
            yqjg: "gsx$预期价格美元每月",
            grjs: "gsx$租房需求介绍和自我介绍",
            wxId: "gsx$微信号",
            xb: "gsx$性别",
            dhyx: "gsx$其他联系方式电话邮箱等",
            fbsj: "gsx$timestamp",
            ltst: "gsx$shorttermorlongterm",
            entryid: "gsx$entryid"
        };

        var refreshPage = function(data){
            var pageRow = parseInt($.url().param("row"));
            var getCell = function(row, col) {
                try {
                    var cell = data.feed.entry[row][columns[col]]["$t"] || "N/A";
                    return cell;
                } catch(e) {
                    zHelper.log("error when getting cell", "ERROR", {e: e, row: row, col: col, data: data});
                }
            };
            var createChild = function(row) {
                var child = template.clone();
                var xq = getCell(row, "xq");
                child.find("#value_wxId").hide();
                child.find("#value_dhyx").hide();
                child.find(".detail").hide();
                for (var col in columns) {
                    child.find("#value_" + col).text(getCell(row, col));

                }
                if (xq == "出租") {
                    child.addClass("panel-success");
                } else if (xq == "求租") {
                    child.addClass("panel-primary");
                } else if (xq == "找室友") {
                    child.addClass("panel-warning");
                }
                child.find("#value_wxId").hide();
                child.find("#btn_show_wxId").click(function(){
                    child.find("#btn_show_wxId").hide();
                    child.find("#value_wxId").show();
                    zHelper.track("show-wechat-id", {pageRow: pageRow});
                });
                child.find("#btn_show_dhyx").click(function(){
                    child.find("#btn_show_dhyx").hide();
                    child.find("#value_dhyx").show();
                    zHelper.track("show-dhyx", {pageRow: pageRow});
                });
                child.find("#btn_show_detail").click(function(){
                    child.find("#btn_show_detail").hide();
                    child.find(".detail").show();
                    zHelper.track("show-detail", {pageRow: pageRow});
                });
                var rowLink = $.url().attr("path") + "?" + $.param({"row": row});
                child.find("#row_link").attr("href", rowLink);
                child.find("#btn_share").attr("data-row", row);
                child.find("#btn_like").attr("data-row", row);
                child.show();
                return child;
            };
            if (!isNaN(pageRow)) {
                var child = createChild(pageRow);
                parent.append(child);
                var rowLink = $.url().attr("source");
                zHelper.log("custom sharing " + rowLink);
                weixin.wxData.link = rowLink;
                var title =  "求分享：" +getCell(pageRow, "xq") + "-" + getCell(pageRow, "wz");
                weixin.wxData.title = title;
                weixin.wxData.desc = title + ",起始时间:" + getCell(pageRow, "qssj") + ", 预期价格" + getCell(pageRow, "yqjg");
                weixin.wxCallbacks.confirm = function() {
                    zHelper.log("分享成功", "INFO", rowLink);
                    $.notify("分享成功", "success");
                };
                weixin.wxCallbacks.fail = function() {
                    zHelper.log("分享失败", "WARNING", rowLink);
                    $.notify("分享失败", "danger");
                };
            } else {
                var dataLength = data.feed.entry.length;
                for (var i = dataLength - 1; i >= 0; i--) {
                    var child = createChild(i);
                    parent.append(child);
                }
                var homeLink = $.url().attr("source");
                zHelper.log("custom sharing " + homeLink);
                weixin.wxData.link = rowLink;
                var title =  "朋友找房子你愿意帮忙介绍吗？";
                weixin.wxData.title = title;
                weixin.wxData.desc = title + "湾区租房互助群，靠谱租房靠朋友。rent.zzn.im";
                weixin.wxCallbacks.confirm = function() {
                    zHelper.log("分享成功", "INFO", rowLink);
                    $.notify("分享成功", "success");
                };
                weixin.wxCallbacks.fail = function() {
                    zHelper.log("分享失败", "WARNING", rowLink);
                    $.notify("分享失败", "danger");
                };
            }
        };
        var row = 1;
        parent.empty();
        $("#loading_panel").show();
        var cachedData = JSON.parse(localStorage.getItem(DATA_KEY));
        if (typeof cachedData === "undefined" || cachedData == null) {
            zHelper.log("cache missed, loading data...");
            $.get(url, function(data) {
                zHelper.log("loaded data from CORS proxy");
                localStorage.setItem(DATA_KEY, JSON.stringify(data));
                refreshPage(data);
            });
        } else {
            zHelper.log("using cached data");
            refreshPage(cachedData);
        }
        $("#loading_panel").hide();
        $("#refresh_btn").click(function() {
            zHelper.log("force fetch new data");
            parent.empty();
            $("#loading_panel").show();
            $.get(url, function(data) {
                zHelper.log("loaded data from CORS proxy");
                localStorage.setItem(DATA_KEY, JSON.stringify(data));
                setTimeout(function(){
                    refreshPage(data);
                    $("#loading_panel").hide();
                }, 250);
            });
        });
        $(".zzn-panel-footer-button").click(function(e){
            var action = $(this).attr("data-track-action");
            var row = $(this).attr("data-row");
            zHelper.log("panel footer button " + action + " clicked. row:" + row);
            zHelper.track(action, "panel footer button " + action + " clicked. row:" + row, {row: row});
            $('#notReadyModal').find("#feature").text(action);
            $('#notReadyModal').modal();
        });
    });
});