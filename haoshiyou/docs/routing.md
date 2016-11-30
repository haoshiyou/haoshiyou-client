# Routing 

## Install cordova deep linking

```bash
cordova plugin add ionic-plugin-deeplinks \
  --variable URL_SCHEME=haoshiyou \
  --variable DEEPLINK_SCHEME=http \
  --variable DEEPLINK_HOST=haoshiyou.org
```

**Note:** if you wants to remove it

```bash
cordova plugin remove ionic-plugin-deeplinks
```

## Command Line to turn on view in Android device / emulator

```bash
adb shell am start -W -a android.intent.action.VIEW -d "http://haoshiyou.org/#/listing/b8ccb607-d1f6-435e-9dc1-3b289b10837e" haoshiyou.org
```

## Reference
### API References
* [Ionic 2 DeepLinker](https://ionicframework.com/docs/v2/api/navigation/DeepLinker/)
* [Universal Links for iOS](https://developer.apple.com/library/content/documentation/General/Conceptual/AppSearch/UniversalLinks.html)
* [App Links for Android](https://developer.android.com/training/app-links/index.html)
### Blog Posts
* [Angular Blog: Improvements Coming for Routing in Angular(Announcement of Angualr2 3.0.0)](http://angularjs.blogspot.com/2016/06/improvements-coming-for-routing-in.html?view=timeslide)
* [Deeplinking in Ionic Apps](http://blog.ionic.io/deeplinking-in-ionic-apps/)
