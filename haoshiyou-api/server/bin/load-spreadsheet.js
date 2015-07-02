var CONST_SPREADSHEET_URL = "https://spreadsheets.google.com/feeds/list/1vzugrYLpgXmFODqysSx331Lhq8LpDQGJ4sQtwSMrtV4/1/public/values?alt=json&callback=JSON_CALLBACK";
var CONST_FIELDS = {
  needType: "gsx$需求类别",
  startDate: "gsx$预计起始日期超过这个日期本条信息失效",
  location: "gsx$邮编或者城市",
  price: "gsx$预期价格美元每月",
  introduction: "gsx$租房需求介绍和自我介绍",
  guid: "gsx$entryid"
  //qy: "gsx$区域",
  //wxId: "gsx$微信号",
  //xb: "gsx$性别",
  //dhyx: "gsx$其他联系方式电话邮箱等",
  //fbsj: "gsx$timestamp",
  //ltst: "gsx$shorttermorlongterm",
};

var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var ds = app.dataSources["MySQL-RDS"];
ds.automigrate(['User', 'Role', 'ACL', 'RoleMapping', 'AccessToken',
  'HsyPost', 'HsyRoommatePreference', 'HsyHousePreference'
], function(err) {
  if (err) throw err;
  else {
    var jsonpClient = require('jsonp-client');

    jsonpClient(CONST_SPREADSHEET_URL, function (err, data) {
      console.log(err);
      var allPosts = [];
      data.feed.entry.forEach(function (row) {
        var hsyPost = {};
        for (var key in CONST_FIELDS) {
          var fieldName = CONST_FIELDS[key];

          var col = row[fieldName]["$t"] || "";
          if (key === "price") {

            hsyPost[key] = parseInt(col) || 0;
          } else hsyPost[key] = col
        }
        hsyPost.createdBySessionId = "before-migration-session-id";
        allPosts.push(hsyPost);
      });
      var HsyPost = app.models.HsyPost;

      console.log("Creating " + allPosts.length);
      for(var i in allPosts) {
        (function(INDEX) {
          HsyPost.create(allPosts[INDEX], function (err, hsyPost) {
            if (err) {
              console.log(err);

              console.log("objs!" + JSON.stringify(objs));
            }
            else {
              hsyPost.hsyRoommatePreference
                .create({}, function(err){if (err) console.error(err);});
              hsyPost.hsyHousePreference
                .create({}, function(err){if (err) console.error(err);});
              console.log("DONE " + INDEX);
            }
          })
        })(i);

      }
    });

  }

});
console.log("end of execution");

