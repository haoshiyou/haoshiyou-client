module.exports = function(server) {


  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());

  // Install a "/ping" route that returns "pong"
  // TODO(zzn): set up real monitoring
  router.get('/ping', function(req, res) {
    console.log("ping pong");
    res.send('pong');
  });

  // TODO(zzn): optimize the following wechat signature algorithm
  var CONST_APPID = "wx7ae4deab928f12fa";
  var CONST_APPSECRET = "bf1a43de360366574a5547e07d267f51";
  var WxSDKCheck = require("wxjssdkconfig");
  var wxJsConfig = new WxSDKCheck(CONST_APPID,CONST_APPSECRET);
  router.get('/wechatsig', function(req, res) {
    console.log("wechatsig gets request!");
    var url = decodeURIComponent(req.query.url);
    console.log(url);
    wxJsConfig.getJSConfig(url,function(error,configData){
      var result = {
        errNo:0,
        errObj:null,
        data:null
      }
      if (error) {
        result.errNo = 1;
        result.errObj = error;
      }
      else {
        result.data = configData;
      }
      res.end(JSON.stringify(result));
    });

  });


  server.use(router);


};
