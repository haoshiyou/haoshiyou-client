var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var ds = app.dataSources['MySQL-RDS'];
ds.autoupdate(['User', 'Role', 'ACL', 'RoleMapping', 'AccessToken',
  'HsyPost', 'HsyRoommatePreference', 'HsyHousePreference'
], function(err) {
    if (err) throw err;
    else console.log("Done!");

});
console.log("end of execution");
