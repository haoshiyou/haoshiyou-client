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

|------:| -------:|
|Feature | 1024x500 24bit PNG or JPG|
|icon    | 512x512 24bit PNG|

### iOS

|----------:| -------:|
|icon        |  1024x1024 JPG or PNG 72DPI+ RGB |
|Screenshot  |  5.5inch(iphone 6/6s Plus), 4.7inch(iphone 6) 4.0 inch, 3.5inch, iPad, iPad Pro|
