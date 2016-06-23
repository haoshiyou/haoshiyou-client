# Haoshiyou project (ionic v2)

This project is a project built with ionic v2

## New Developer 

### Prerequisite
You need to install the following in your computer:

1. NPM
2. Ionic@beta
3. Xcode and Iphone Emulator
4. Android Studio and SDK
5. (Optional)Genymotion for faster Android Emulation

### Quick Start

1. Git clone the repo (contact xinbenlv@ for access.), and then 
switch to branch "lab2"

```bash
git clone git@github.com:xinbenlv/rent.zzn.im.git
cd rent.zzn.im
git checkout -b lab2 origin/lab2 # checkout branch "lab2"

```

2. Install packages and setup ionic 

```bash
cd lab/haoshiyou/
npm install --dev
ionic state restore
```

3. Run the Web

```
ionic serve -l
```

4. Run the ios emulator and android emulator
```bash
ionic emulate ios
ionic emulate android
```

### Install Push Notification

1. Add GoogleService-Info.plist to `platforms/ios/haoshiyou`
2. In Xcode in target `CordovaLib` and in `Build Phases` 
in the part of `Copy Bundle Resources`, add GoogleService-Info.plist,

For example

Inline-style: 
![Screenshot for Adding GoogleService-Info.plist](docs/screenshot/xcode-add-fcm-google-service-info-plist.png)


See [ionicv2-push-example](https://github.com/xinbenlv-just-learning/ionicv2-push-example) for more

### Install typings definition from DefinitelyTyped

For example

```
typings install dt~firebase --save --global
```

Install 


### Run 

```
ionic run -lcs --debug ios --address=localhost
```
### Debug

Install Google
1. Follow the instruction to download ARM translator
https://inthecheesefactory.com/blog/how-to-install-google-services-on-genymotion/en

2. Download GAPPS from http://opengapps.org/


### Release

Follow [Ionic Publishing Guide](http://ionicframework.com/docs/guide/publishing.html)
for publishing.

1. Copy haoshiyou-android.keystore from xinbenlv@'s secret fault

2. Run the following command. You will be prompt for keystore secret, ask xinbenlv@

```
ionic build --release android && jarsigner -verbose \
-sigalg SHA1withRSA -digestalg SHA1 \
-keystore haoshiyou-android.keystore \
platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name # do not change "alias_name"
```

3. run

```
alias zipalign=~/Library/Android/sdk/build-tools/23.0.3/zipalign
zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk releases/haoshiyou-android-release-0.0.2.apk
```

### Resource resolutions for releases

All dimensions are in Pixels, Width X Height

#### Google Play

|------:| -------:
Feature | 1024x500 24bit PNG or JPG
icon    | 512x512 24bit PNG

#### iOS

|----------:| -------:
icon        |  1024x1024 JPG or PNG 72DPI+ RGB 
Screenshot  |  5.5inch(iphone 6/6s Plus), 4.7inch(iphone 6) 4.0 inch, 3.5inch, iPad, iPad Pro

## Known Issues
Due to https://github.com/driftyco/ionic-cli/issues/420
Splash screen cannot be updated.


## Road Map
(A task without assignee is xinbenlv@)
 - DONE Create, Save, Update, View, Sort a listing
 - DONE LogIn, LogOut, Password Reset
 - DONE Map Marker Listing Navigation
 - DONE Chat
 - DONE City and Zip Pipe
 - DONE Create chat from listing.
 - DONE Image picker
 - DONE Google Map on Detail Page
 - DONE Handle most frequent bad cases
   -  - DONE No login
   -  - DONE No internet connection
 - Release 1: MVP for Early Adopter
   -  - DONE Strip to production credentials
   -  - DONE Turn Off FB and LinkedIn Auth0 signin.
   -  - DONE Disable Web Upload Image, Stop nav-back after upload image failure.
   -  - DONE Add icon, splash screen, webpage icon
   -  - DONE Sanitize
   -  - DONE Publish on Android and iOS for beta testing.
   -  - Bugs
   -  -  - DONE Flash quit when adding picture
   -  -  - DONE Flash quit when registering
   -  -  - DONE Edit validation

 - Release 2: MVP for Growth
   -  - DONE Make the detail page editable
   -  - DONE Show image full screen view.
   -  - DONE Push notification
   -  -  - DONE FCM registration
   -  -  - DONE Push for chat
   -  - DONE Facebook and LinkedIn Sign-In Callback Fixing
   -  - DONE Firebase event tracking
   -  - Bugs
   -  -  - DONE Already logged in, reload the page, and then try to 
   load a listing, starting a chat will cause nullpointer exception.

 - Web Release
   -  - Large Screen: listing list on left and map on right (wrj@)
   -  - Web image picker in creation page (wrj@)

 - Release 3: Prod
   -  - DONE Use a production database
   -  - DONE Update Splash Screen and Logo
   -  - Bug
   -  -  - DONE Invalid date when posting a new listing
   -  - Image Related Features
   -  -  - DONE Image and Listing Deletion.
   -  -  - DONE Image viewer now closable
   -  -  - Upload image in full resolution, display default low resolution
   -  - DONE disallow anonymous user to login when create a listing or chat.
   -  - Improve chatting
   -  -  - New message counting badge
   -  -  - Listing
      
 - Release 4: Performance and Reliability
   -  - Testing structure
   -  - Add performance profiling related logging
 - BLOCKED
   -  - Firebase Realtime DB Security Rules: blocked on 
   [auth0-angular2](github.com/auth0/auth0-angular2)
   -  - DeepLinking blocked on @angular/router to 
   [finalize](http://angularjs.blogspot.com/2016/06/improvements-coming-for-routing-in.html),
   -  - Shared to WeChat blocked on DeepLinking