/**
 * Created by zzn on 2015-05-05.
 * Contains the MVC framework working for a PostItem
 *
 * Requires jQuery
 */

var PostItemMVC = (function ($, wx, zHelper) {
    "use strict";
    var CONST_SPREADSHEET_URL = "https://spreadsheets.google.com/feeds/list/1vzugrYLpgXmFODqysSx331Lhq8LpDQGJ4sQtwSMrtV4/1/public/values?alt=json";
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

    var CONST_VALUE_ID_PREFIX = "#value_";
    var CONST_ITEM_TEMPLATE_ID = "#value_panel_template";
    var CONST_DOMAIN_NAME = "rent.zzn.im";
    /**
     * Class definition of Model
     * @constructor
     */
    var Model = function () {
        this.clearData(); // init with clear data
    };

    /**
     *
     * Creates a view as a clone of template
     * @constructor
     */
    var ItemView = function (guid) {
        this.guid_ = guid;
        this.templateClone_ = $(CONST_ITEM_TEMPLATE_ID).clone();
        this.guidLink_ = "http://" + CONST_DOMAIN_NAME + "/?" + $.param({"guid": guid});
    };

    var PanelView = function () {
        this.panelDom_ = $("#value_panel_parent");
    };

    /**
     * Class definition of Controller
     * @constructor
     */
    var Controller = function () {
        this.model_ = new Model();
        this.panelView_ = new PanelView();
    };

    // Set up cors proxy for jQuery
    $.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
            options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    Model.prototype.loadDataAsync = function (callback) {
        var that = this;
        $.get(CONST_SPREADSHEET_URL, function (data) {
            zHelper.log("loaded data from CORS proxy");
            that.cachedData_ = {}; //update data;
            data.feed.entry.forEach(function (row) {
                var guid = row[CONST_FIELD_KEYS.entryid]["$t"] || "N/A";
                var datum = {};
                CONST_FIELDS.forEach(function (fieldName) {
                    datum[fieldName] = row[CONST_FIELD_KEYS[fieldName]]["$t"] || "N/A";
                });
                that.cachedData_[guid] = datum;
                that.guidArray_.push(guid);
            });
            callback(data); // done
        });
    };

    Model.prototype.clearData = function () {
        this.cachedData_ = {};
        this.guidArray_ = [];
    };

    Model.prototype.getGuidArray = function () {
        return this.guidArray_;
    };

    Model.prototype.getFieldData = function (fieldName, guid) {
        return this.cachedData_[guid][fieldName];
    };

    /**
     * Add Guid Related Links
     * @param guid
     * @private
     */
    ItemView.prototype.decrorate_ = function () {
        var guid = this.guid_;
        var template = this.templateClone_;
        var guidLink = this.guidLink_;
        template.find("#qrcode").qrcode(guidLink);
        template.find("#row_link").attr("href", guidLink);
        template.find("#btn_share").attr("data-guid", guid);
        template.find("#btn_like").attr("data-guid", guid);
        template.show();
    };

    /**
     *
     * @param should boolean to indicate show(true) or hide(false)
     */
    ItemView.prototype.shouldShowContactInfo = function (should) {
        var template = this.templateClone_;
        if (should) {
            template.find("#btn_show_wxId").hide();
            template.find("#btn_show_dhyx").hide();
        } else {
            template.find("#value_wxId").hide();
            template.find("#value_dhyx").hide();

            template.find("#value_wxId").hide();
            template.find("#btn_show_wxId").click(function () {
                template.find("#btn_show_wxId").hide();
                template.find("#value_wxId").show();
            });
            template.find("#btn_show_dhyx").click(function () {
                template.find("#btn_show_dhyx").hide();
                template.find("#value_dhyx").show();
            });

        }
    };

    ItemView.prototype.displayData = function (model) {
        var template = this.templateClone_;
        var guid = this.guid_;
        var xq = model.getFieldData("xq", guid);
        if (xq == "出租") {
            template.addClass("panel-success");
        } else if (xq == "求租") {
            template.addClass("panel-primary");
        } else if (xq == "找室友") {
            template.addClass("panel-warning");
        }
        CONST_FIELDS.forEach(function (fieldName) {
            template.find(CONST_VALUE_ID_PREFIX + fieldName).text(model.getFieldData(fieldName, guid));
        });

        // Set up Id of template
        template.attr("id", "value_panel" + guid);
        this.decrorate_();
    };
    ItemView.prototype.getDom = function () {
        return this.templateClone_;
    };

    ItemView.prototype.configureWeChat_ = function(model){
        var guidLink = this.guidLink_;
        var guid = this.guid_;
        var xq = model.getFieldData("xq", guid);
        var title, link, imgUrl, desc;

        if (xq == "出租") {
            imgUrl = "http://" + CONST_DOMAIN_NAME + "/img/logo-v1-green-1024sq2.jpg";
        } else if (xq == "求租") {
            imgUrl = "http://" + CONST_DOMAIN_NAME + "/img/logo-v1-blue-1024sq2.jpg";
        } else if (xq == "找室友") {
            imgUrl = "http://" + CONST_DOMAIN_NAME +"/img/logo-v1-yellow-1024sq2.jpg";
        }
        title = model.getFieldData("xq", guid) +
            model.getFieldData("qy", guid) + "，时间是"
        model.getFieldData("qssj", guid) + "左右开始，求分享！";

        link = guidLink;
        desc = model.getFieldData("grjs", guid);
        var wxData = {
            title: title,
            link: link,
            imgUrl: imgUrl,
            desc: desc,
            trigger: function (res) {
                alert('用户点击分享到微博');
            },
            complete: function (res) {
                alert(JSON.stringify(res));
            },
            success: function (res) {
                alert('已分享');
            },
            cancel: function (res) {
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        };
        alert("wxData: " + JSON.stringify(wxData));
        wx.onMenuShareAppMessage(wxData);

    };
    PanelView.prototype.addChild = function (item) {
        this.panelDom_.append(item);
    };

    PanelView.prototype.clearChildren = function () {
        this.panelDom_.empty();
    };

    Controller.prototype.initAsync = function (callback) {
        this.model_.loadDataAsync(callback);
    };

    Controller.prototype.showAllItems = function () {
        var that = this;
        this.panelView_.clearChildren();
        this.model_.getGuidArray().forEach(function (guid) {
            var item = new ItemView(guid);
            item.displayData(that.model_, guid);
            item.shouldShowContactInfo(false);
            that.panelView_.addChild(item.getDom());

        });
    };


    /**
     *
     * @param guid The GUID of a given listing post
     */
    Controller.prototype.showItemByGuid = function (guid) {
        this.panelView_.clearChildren();
        var that = this;
        var item = new ItemView(guid);
        item.displayData(this.model_, guid);
        item.shouldShowContactInfo(true);
        wx.ready(function(res){
            zHelper.log(res);
            wx.checkJsApi({
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage"
                ],
                success: function (res) {
                    alert("wxCheckJsApi, success");
                    alert(JSON.stringify(res));
                    item.configureWeChat_(that.model_);
                },
                fail: function (res) {
                    alert("wxCheckJsApi, faile");
                    zHelper.log(JSON.stringify(res));
                }
            });

        });

        zHelper.log("XXX after setting wechat");
        this.panelView_.addChild(item.getDom());
    };

    return {
        Controller: Controller
    };
})($, wx, zHelper);