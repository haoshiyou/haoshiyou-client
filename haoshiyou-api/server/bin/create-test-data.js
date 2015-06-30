var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var ds = app.dataSources.PostgreSQL;
ds.automigrate(['User', 'Role', 'ACL', 'RoleMapping', 'AccessToken',
  'HsyPost', 'HsyRoommatePreference', 'HsyHousePreference'
], function(err) {
    if (err) throw err;
    else console.log("Done!");

});
console.log("end of execution");
