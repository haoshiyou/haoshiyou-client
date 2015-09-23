# Title

A project to help my San Francsco friends match landlords, tenants and roommates.

## Getting Start
### Install and set up
```bash
npm install                        # Install all npm package defined in package.json
sudo npm -g install cordova ionic  # Install ionic and cordova
cd haoshiyou-ionic && ionic state restore                # Install ionic plugins
```

#### start web server
```bash
foreman start
```

#### build an ionic mobile app

```bash
cd haoshiyoiu-ionic
ionic run android
ionic run ios
``` 
Refer to http://ionicframework.com/docs/guide/testing.html to see how to test build a local mobile app.
## Development
``` bash
### auto update, to perform after schema change
node haoshiyou-api/server/bin/autoupdate.js
```
### Change  backend
git-root/haoshiyou-ionic/www/js/app.js
```javascript
.config(function(LoopBackResourceProvider, $compileProvider, BACKEND){

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://' + BACKEND + '/api');
    // LoopBackResourceProvider.setUrlBase('http://haoshiyou-dev.herokuapp.com/api');

    // TODO(zzn): is the imgSrcSanitizationWhitelist really needed
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|content|file|assets-library):/);


}).constant("BACKEND", "dev.haoshiyou.org") // Change here, change to "localhost:5000"
```
## Explanation of Directory as of 2015-07-18
.
├── haoshiyou-api       The API part of the code
├── haoshiyou-ionic     The hybrid app of HTML5 
├── haoshiyou-v1        The deprecated version one currently serving at http://rent.zzn.im

## Troubleshooting
#### ios9 new security check cause failure in running in ios 
run 030_modify_plist.sh


## Developer

Zainan Victor Zhou <zzn@zzn.im>
