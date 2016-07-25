
# New Developer 

## Prerequisite
You need to install the following in your computer:

1. git, npm
2. Ionic@beta
3. Xcode and Iphone Emulator (if developing features related iOS)
4. Android Studio and SDK (if developing features related to Android)
5. (Optional)Genymotion for faster Android Emulation

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
cd haoshiyou
rm -rf www/config
# change "dev" here to "prod" to get prod config file
git clone -b dev git@github.com:xinbenlv/haoshiyou-security.git www/config
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
