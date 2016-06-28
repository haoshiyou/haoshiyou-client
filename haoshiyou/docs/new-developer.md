
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


## Known Issues
Due to https://github.com/driftyco/ionic-cli/issues/420
Splash screen cannot be updated.

## Note

### Create a FCM topic

According to http://stackoverflow.com/questions/37367292/how-to-create-topic-in-fcm-notifications

First You need to create topic thorugh making POST request on
https://iid.googleapis.com/iid/v1/IID_TOKEN/rel/topics/TOPIC_NAME  

https://iid.googleapis.com/iid/info/n2dmZrF1I_E:APA91bHA7Y1wQxcaYvJiIAm-jxE1-d7G1gEY78xnlA_SuerHFV25tzklW37EwSIO2gIQilll-RzdSGPtkBnZ9E37vvZjenbp9f4YfsJIzPSZ23wj07E1OqvLIkO7HgLRMZ8bPlxBl70t?details=true

```
# Create a topic "topic" (IID_TOKEN can be any registration id of a instance)
curl --header "Authorization: key=AIzaSyA8IczGUriov_yYY4bnrqKUkL7F4v6i9sc" \
https://iid.googleapis.com/iid/v1/n2dmZrF1I_E:APA91bHA7Y1wQxcaYvJiIAm-jxE1-d7G1gEY78xnlA_SuerHFV25tzklW37EwSIO2gIQilll-RzdSGPtkBnZ9E37vvZjenbp9f4YfsJIzPSZ23wj07E1OqvLIkO7HgLRMZ8bPlxBl70t/rel/topics/listing -d "\{\}"

curl --header "Authorization: key=AIzaSyA8IczGUriov_yYY4bnrqKUkL7F4v6i9sc" \
https://iid.googleapis.com/iid/v1/fPc3Ql8YybY:APA91bHMHA-Isz1fqp0gIC9qDJP-LK86onoEi6gY8s0dlEZkLlVzthZQuK6m1BtcwBtUTaWW0YY85H4SeEgK-zmds8oycR1qlmjCQxJm8h2yyUw6GZdkXJ0SVqL-uKiRTs3uKaoFdwBb/rel/topics/listing -d "\{\}"

# Confirm the topic is created
curl -X GET --header "Authorization: key=AIzaSyA8IczGUriov_yYY4bnrqKUkL7F4v6i9sc" \
https://iid.googleapis.com/iid/info/n2dmZrF1I_E:APA91bHA7Y1wQxcaYvJiIAm-jxE1-d7G1gEY78xnlA_SuerHFV25tzklW37EwSIO2gIQilll-RzdSGPtkBnZ9E37vvZjenbp9f4YfsJIzPSZ23wj07E1OqvLIkO7HgLRMZ8bPlxBl70t?details=true

curl -X GET --header "Authorization: key=AIzaSyA8IczGUriov_yYY4bnrqKUkL7F4v6i9sc" \
https://iid.googleapis.com/iid/info/fPc3Ql8YybY:APA91bHMHA-Isz1fqp0gIC9qDJP-LK86onoEi6gY8s0dlEZkLlVzthZQuK6m1BtcwBtUTaWW0YY85H4SeEgK-zmds8oycR1qlmjCQxJm8h2yyUw6GZdkXJ0SVqL-uKiRTs3uKaoFdwBb?details=true

```

TODO(xinbenlv): FCM topic message still pending verify

### Android push icon issue
https://github.com/phonegap/phonegap-plugin-push/blob/c63a41a0a58ec37b4ce23546802177c0e5f554f4/docs/PAYLOAD.md