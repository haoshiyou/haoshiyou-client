# Release Instruction for Android and iOS

## Automatic Release using Fastlane
### Setup Fastlane with RVM and Gemset
[Instructions](https://coderwall.com/p/bvkgtw/easy-way-to-create-gemset-per-project-using-rvm)
```shell
# In git clone dir root 
cd haoshiyou
rvm gemset create fastlane_gemset
rvm install ruby-2.3.1
cd ..
cd haoshiyou # again, and will be asked by RVM to confirm using .rvmrc in this 
             # folder, select yes

```

### Run fastlane

```shell
fastlane deploy_all storepass:<insert_store_password_here> # ask xinbenlv@ for it. 
```

## Manual Release

Follow [Ionic Publishing Guide](http://ionicframework.com/docs/guide/publishing.html)
for publishing.

1. Copy haoshiyou-android.keystore from xinbenlv@gmail.com dropbox folder

2. Run the following command. You will be prompt for keystore secret, ask xinbenlv@, it's his
secret fault on LastPass
3. Collect Google Play Developer Console Release Manager Credentials JSON file
[Instructions](https://docs.fastlane.tools/getting-started/android/setup/#collect-your-google-credentials)

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

## Resource resolutions for releases

All dimensions are in Pixels, Width X Height

### Google Play

|------:| -------:
Feature | 1024x500 24bit PNG or JPG
icon    | 512x512 24bit PNG

### iOS

|----------:| -------:
icon        |  1024x1024 JPG or PNG 72DPI+ RGB 
Screenshot  |  5.5inch(iphone 6/6s Plus), 4.7inch(iphone 6) 4.0 inch, 3.5inch, iPad, iPad Pro

### Troubleshooting

#### Android Version Too Low
Sometimes you see error like this 
```bash
[19:29:39]: Preparing apk at path 'releases/haoshiyou-android-release.apk' for upload...
[19:29:43]: Updating track 'alpha'...
[19:29:43]: Uploading all changes to Google Play...
+---------------+----------------+
|          Lane Context          |
+---------------+----------------+
| PLATFORM_NAME | android        |
| LANE_NAME     | android deploy |
+---------------+----------------+
[19:29:44]: Google Api Error: multiApkShadowedActiveApk: Version 30823 of this app can not be downloaded by any devices as they will all receive APKs with higher version codes.

+------+---------------------------------------------------------------+-------------+
|                                  fastlane summary                                  |
+------+---------------------------------------------------------------+-------------+
| Step | Action                                                        | Time (in s) |
+------+---------------------------------------------------------------+-------------+
| 1    | update_fastlane                                               | 2           |
| 2    | Verifying required fastlane version                           | 0           |
| 3    | Switch to prepare lane                                        | 0           |
| 4    | cd .. && ./travis/setup-env.sh                                | 0           |
| 5    | Switch to android prepare lane                                | 0           |
| 6    | cd .. && ./travis/setup-env.sh                                | 0           |
| 7    | Switch to android android_publish lane                        | 0           |
| 8    | Switch to android ionic_android_build lane                    | 0           |
| 9    | ionic build android --release                                 | 40          |
| 10   | Switch to android android_deploy lane                         | 0           |
| 11   | cd .. && jarsigner -verbose -storepass 3c9KMeBA5vKE -sigalg S | 1           |
| 12   | cd .. && ${HOME}/Library/Android/sdk/build-tools/23.0.3/zipal | 0           |
| 13   | Switch to android android_upload lane                         | 0           |
| 💥   | supply                                                        | 6           |
+------+---------------------------------------------------------------+-------------+

[19:29:44]: fastlane finished with errors

[!] Google Api Error: multiApkShadowedActiveApk: Version 30823 of this app can not be downloaded by any devices as they will all receive APKs with higher version codes.

```

This is because the previous android version generation script append a "10" or "08" after
`30823` making it `3082310`. Now when you are updating the `30823` it says the version 
is lower than the existing one.

To resolve it, we need to tweak the script for this generating part, modify the file of this path
`haoshiyou-dev/haoshiyou/platforms/android/cordova/lib/prepare.js`


```javascript

```

```
[!] xcodebuild -list timed-out after 30 seconds. You might need to recreate the user schemes. 
You can override the timeout value with the environment variable 
FASTLANE_XCODE_LIST_TIMEOUT
```
