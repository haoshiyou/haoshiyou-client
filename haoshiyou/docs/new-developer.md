
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
switch to branch "dev"

```bash
git clone git@github.com:xinbenlv/rent.zzn.im.git
cd rent.zzn.im
git checkout -b dev origin/dev # checkout branch "dev"
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

### Install typings definition from DefinitelyTyped

For example

```
typings install dt~firebase --save --global
```

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


## New Developer Learning Material
1. [Javascript W3School Tutorial](http://www.w3schools.com/js/default.asp)
2. [TypeScript Official Tutorial](https://www.typescriptlang.org/docs/tutorial.html)
3. [Anglar2TS Official Quick Start](https://angular.io/docs/ts/latest/quickstart.html) 
4. [Ionic V2 Official Getting Start](http://ionicframework.com/docs/v2/getting-started/)
5. [Git]()
5. (Optional)[Corodva](https://cordova.apache.org/)
