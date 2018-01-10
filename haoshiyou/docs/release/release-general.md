## Release Though `fastlane`

### Set Release environment to `Development`
```
export IONIC_ENV="dev"
```

### Set Release environment to `Production`

```
export IONIC_ENV="prod"
```
### Release only ALL

```
fastlane publish_all
```
### Release only to Web

```bash
fastlane publish_web
```

### Release only to iOS

```bash
fastlane publish_ios
```

### Release only to Android

```bash
fastlane publish_android
```

## Release only to CodePush
[CodePush]()http://ionicframework.com/docs/native/code-push/)
allow the developer to push update to devices that already 
deployed the code without needing to go through Google Play or iTunes AppStore

```bash
npm install -g code-push-cli
export CORDOVA_VERSION=5.7.47
npm run codepush
```
 

## Creating CHANGELOG
Before releasing new version follow [github_changelog_generator]
(https://github.com/skywinder/github-changelog-generator)
for instructions.

This is the command to generate CHANGELOG in our repo.

```shell
gem install github_changelog_generator # install github_changelog_generator
```

Usage
```shell
github_changelog_generator -u xinbenlv -p rent.zzn.im
```

## New Developer Learning Material
1. [Javascript W3School Tutorial](http://www.w3schools.com/js/default.asp)
2. [TypeScript Official Tutorial](https://www.typescriptlang.org/docs/tutorial.html)
3. [Anglar2TS Official Quick Start](https://angular.io/docs/ts/latest/quickstart.html) 
4. [Ionic V2 Official Getting Start](http://ionicframework.com/docs/v2/getting-started/)
5. [Git Tutorial by GitHub](https://try.github.io)
5. (Optional)[Corodva](https://cordova.apache.org/)
