var ALL_POSTS = [
  {
    needType: "招租",
    startDate: "2015-10-10",
    location: "1600 Amphitheatre Pkwy, CA, 94043",
    price: 1500,
    introduction: "A very good house near the location, safe and clean. Looking for a place near Uber QH, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum pellentesque felis, vel ultricies ligula rhoncus ut. Donec interdum urna lobortis, volutpat dui at, mattis ante. Maecenas risus augue, dictum a risus nec, porttitor bibendum velit. Vivamus massa mi, faucibus gravida mi nec, faucibus tristique massa. Proin efficitur eu sapien vitae ullamcorper. Aliquam ligula elit, tempus efficitur lacus rutrum, faucibus sagittis mi. Duis sed ligula viverra, porta augue sed, lobortis augue. Curabitur eu felis quis nisl fermentum dignissim. Nulla scelerisque, ipsum eget ullamcorper laoreet, quam lacus sagittis mi, non laoreet felis nibh nec lectus. Nam nisi felis, vulputate sit amet tristique vel, viverra sed sapien. Etiam imperdiet purus sed dapibus facilisis. In hac habitasse platea dictumst. Nulla non quam bibendum, iaculis ante non, porttitor arcu.s",
    wechat: "xinbenlv",
    guid: "9283f01b-dab3-4d21-a2fc-e7f599539076",
    createdBySessionId: "ca6c7529-962e-42bf-a2e1-992c5e749dfe",
    images: [
      "drh3taiwmjytqchiyaug",
      "rd5piqclbsf55q2qsmxl",
      "uxkxnm1g8lqkhx3hootg",
      "ctwzuiqnti3gyorla1ja"
    ],
  },
  {
    needType: "求租",
    startDate: "2015-12-01",
    location: "888 Brannan St, San Francisco, CA 94103",
    radiusInMiles: "10",
    price: 2100,
    introduction: "Looking for a place near AirBnB HQ. Looking for a place near Uber QH, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum pellentesque felis, vel ultricies ligula rhoncus ut. Donec interdum urna lobortis, volutpat dui at, mattis ante. Maecenas risus augue, dictum a risus nec, porttitor bibendum velit. Vivamus massa mi, faucibus gravida mi nec, faucibus tristique massa. Proin efficitur eu sapien vitae ullamcorper. Aliquam ligula elit, tempus efficitur lacus rutrum, faucibus sagittis mi. Duis sed ligula viverra, porta augue sed, lobortis augue. Curabitur eu felis quis nisl fermentum dignissim. Nulla scelerisque, ipsum eget ullamcorper laoreet, quam lacus sagittis mi, non laoreet felis nibh nec lectus. Nam nisi felis, vulputate sit amet tristique vel, viverra sed sapien. Etiam imperdiet purus sed dapibus facilisis. In hac habitasse platea dictumst. Nulla non quam bibendum, iaculis ante non, porttitor arcu.",
    wechat: "qiushadu",
    guid: "5d8e46e9-fa64-4802-8fa0-db9ecebb87a8",
    createdBySessionId: "d2ad96d9-6254-4860-82a0-733f47dee63f"
  },
  {
    needType: "找室友",
    startDate: "2015-11-01",
    location: "1455 Market St, San Francisco, CA 94103, United States.",
    price: 1500,
    introduction: "Looking for a place near Uber QH, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum pellentesque felis, vel ultricies ligula rhoncus ut. Donec interdum urna lobortis, volutpat dui at, mattis ante. Maecenas risus augue, dictum a risus nec, porttitor bibendum velit. Vivamus massa mi, faucibus gravida mi nec, faucibus tristique massa. Proin efficitur eu sapien vitae ullamcorper. Aliquam ligula elit, tempus efficitur lacus rutrum, faucibus sagittis mi. Duis sed ligula viverra, porta augue sed, lobortis augue. Curabitur eu felis quis nisl fermentum dignissim. Nulla scelerisque, ipsum eget ullamcorper laoreet, quam lacus sagittis mi, non laoreet felis nibh nec lectus. Nam nisi felis, vulputate sit amet tristique vel, viverra sed sapien. Etiam imperdiet purus sed dapibus facilisis. In hac habitasse platea dictumst. Nulla non quam bibendum, iaculis ante non, porttitor arcu.",
    wechat: "xudongzhu",
    guid: "7cc18a5e-62e1-4eb8-9680-2285678748e3",
    createdBySessionId: "503470da-9d99-4c08-8c9b-6e5e9c254bde"
  },
];

var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var ds = app.dataSources["MySQL-RDS"];
ds.automigrate(['User', 'Role', 'ACL', 'RoleMapping', 'AccessToken',
  'HsyPost', 'HsyRoommatePreference', 'HsyHousePreference'
], function(err) {
  if (err) throw err;
  else {
    var HsyPost = app.models.HsyPost;
    console.log("Creating " + ALL_POSTS.length);
    for(var i in ALL_POSTS) {
      (function(INDEX) {
        HsyPost.create(ALL_POSTS[INDEX], function (err, hsyPost) {
          if (err) {
            console.log(err);
            // console.log("objs!" + JSON.stringify(objs));
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
  }

});
console.log("end of execution");

