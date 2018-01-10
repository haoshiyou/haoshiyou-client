fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

## Choose your installation method:

| Method                     | OS support                              | Description                                                                                                                           |
|----------------------------|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| [Homebrew](http://brew.sh) | macOS                                   | `brew cask install fastlane`                                                                                                          |
| Installer Script           | macOS                                   | [Download the zip file](https://download.fastlane.tools). Then double click on the `install` script (or run it in a terminal window). |
| RubyGems                   | macOS or Linux with Ruby 2.0.0 or above | `sudo gem install fastlane -NV`                                                                                                       |

# Available Actions
### bump_version
```
fastlane bump_version
```

### prepare_env
```
fastlane prepare_env
```

### upload_web
```
fastlane upload_web
```
Do a new upload to haoshiyou.org Web.
### publish_ios
```
fastlane publish_ios
```
Deploy a new version to the App Store/
### publish_android
```
fastlane publish_android
```
Deploy a new version to the Google Play Store.
### publish_web
```
fastlane publish_web
```
Publish a new version to the web
### publish_all
```
fastlane publish_all
```
Deploy to all platforms.

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
