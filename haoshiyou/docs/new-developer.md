
# New Developer 

## Prerequisite
You need to install the following in your computer:
### Install git 



### 
1. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- zzn currently uses git 2.8.1).
3. Install [node](https://nodejs.org/en/download/) - zzn uses 6.9.1
2. Install [npm](https://docs.npmjs.com/getting-started/installing-node) - zzn uses 3.10.8
4. Install [ionic](http://ionicframework.com/docs/v2/setup/installation/) - zzn uses 2.1.4
5. Install [Cordova](https://cordova.apache.org/docs/en/latest/guide/cli/) - zzn uses 6.4.0
6. [Xcode](https://developer.apple.com/download/)
7. [Iphone Emulator](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/iOS_Simulator_Guide/GettingStartedwithiOSSimulator/GettingStartedwithiOSSimulator.html)
(if developing features related iOS)
8. [Android Studio / SDK](https://developer.android.com/studio/index.html) 
(if developing features related to Android)

## Quick Start

1. Git clone the repo (contact xinbenlv@ for access.), and then 
switch to branch "dev"

```shell
git clone git@github.com:xinbenlv/rent.zzn.im.git
cd rent.zzn.im
git checkout -b dev origin/dev # checkout branch "dev"
```

2. Check out config file {#config}

```shell
rm -rf haoshiyou/www/config
# change "dev" here to "prod" to get prod config file
git clone -b dev git@github.com:xinbenlv/haoshiyou-security.git haoshiyou/www/config
```

2. Install packages and setup ionic 

```shell
cd lab/haoshiyou/
npm install --dev
ionic state restore
```

3. Run the Web

```shell
ionic serve -l
```

4. Run the ios emulator and android emulator

```shell
ionic emulate ios
ionic emulate android
```

5. Run the ios device (need to connect your mac to an physical iPhone/iPad)
```shell
ionic run ios --device # needs --device to work
```

## Switch between PROD and DEV environment
```shell
git config -f .gitmodules submodule.config.branch prod # or dev

```

## Create CHANGELOG
Before releasing new version follow [github_changelog_generator]
(https://github.com/skywinder/github-changelog-generator)
for instructions.

This is the command to generate CHANGELOG in our repo.

```shell
github_changelog_generator -u xinbenlv -p rent.zzn.im
```

## Install typings definition from DefinitelyTyped

For example

```shell
typings install dt~firebase --save --global
```

## New Developer Learning Material
1. [Javascript W3School Tutorial](http://www.w3schools.com/js/default.asp)
2. [TypeScript Official Tutorial](https://www.typescriptlang.org/docs/tutorial.html)
3. [Anglar2TS Official Quick Start](https://angular.io/docs/ts/latest/quickstart.html) 
4. [Ionic V2 Official Getting Start](http://ionicframework.com/docs/v2/getting-started/)
5. [Git Tutorial by GitHub](https://try.github.io)
5. (Optional)[Corodva](https://cordova.apache.org/)
