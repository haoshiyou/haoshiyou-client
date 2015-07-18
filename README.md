# Title

A project to help my San Francsco friends match landlords, tenants and roommates.

## Getting Start
### Install and set up
```bash
npm install 
sudo npm -g cordova ionic
ionic state restore
```

# start web server
```bash
foreman start
```

## Development
``` bash
# auto update, to perform after schema change
node haoshiyou-api/server/bin/autoupdate.js
```
### Change backend
git-root/haoshiyou-ionic/www/js/app.js
```javascript
.config(function(LoopBackResourceProvider, $compileProvider, BACKEND){

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://' + BACKEND + '/api');
    // LoopBackResourceProvider.setUrlBase('http://haoshiyou-dev.herokuapp.com/api');

    // TODO(zzn): is the imgSrcSanitizationWhitelist really needed
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|content|file|assets-library):/);


}).constant("BACKEND", "dev.haoshiyou.org") // Change here
```
## Developer

Zainan Victor Zhou <zzn@zzn.im>
