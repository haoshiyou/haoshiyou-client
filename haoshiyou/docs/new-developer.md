
## Start Guide for New Developer for Only Local Web

### Prerequisite
You need to install the following in your computer:

1. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- zzn currently uses git 2.8.1).
3. Install [node](https://nodejs.org/en/download/) - zzn uses 6.9.1
2. Install [npm](https://docs.npmjs.com/getting-started/installing-node) - zzn uses 3.10.8
4. Install [ionic](http://ionicframework.com/docs/v2/setup/installation/) - zzn uses 2.1.4
5. Install [Cordova](https://cordova.apache.org/docs/en/latest/guide/cli/) - zzn uses 6.4.0

**Note:** if you only want to develop on a local web, you can stop here. The following is 
only for developer who wants to develop and debug on iOS and Android mobile platforms.

### Quick Start

1. Git clone the repo (contact xinbenlv@ for access.), and then 
switch to branch "dev"

```bash
# TODO(zzn): add github 
git clone git@github.com:xinbenlv/rent.zzn.im.git haoshiyou-dev
cd haoshiyou-dev
git checkout -b dev origin/dev # checkout branch "dev"
```

2. Check out Environment File

```sh
export IONIC_ENV=prod # or change to prod
# assuming you are in the root of the git repo of haoshiyou-dev
export GITHUB_TOKEN=<github_token> # ask xinbenlv@ for the actual token
./travis/setup-env.sh
```

3. Install packages and setup ionic 

```bash
cd haoshiyou
npm install --dev
```

4. Run the Web

```bash
ionic serve -l
```

## Additional Start Guide for Android and iOS Development

### Prerequisite for Mobile (Continued)

1. [Xcode](https://developer.apple.com/download/)
2. [Iphone Emulator](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/iOS_Simulator_Guide/GettingStartedwithiOSSimulator/GettingStartedwithiOSSimulator.html)
(if developing features related iOS)
3. [Android Studio / SDK](https://developer.android.com/studio/index.html) 
(if developing features related to Android)

### ## Quick Start (Continued)
1. Restore cordova state
```bash
ionic state restore
```

2. Run the ios emulator and android emulator

```bash
ionic emulate ios
ionic emulate android
```

3. Run the ios device (need to connect your mac to an physical iPhone/iPad)
```shell
ionic run ios --device # needs --device to work
```
