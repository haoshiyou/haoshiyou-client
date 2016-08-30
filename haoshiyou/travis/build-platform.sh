#!/usr/bin/env bash

if [[ $TRAVIS_OS_NAME == 'osx' ]]; then
  export PLATFORM="ios"
else
  export PLATFORM="android"
  export ANDROID_HOME=$PWD/android-sdk-linux
  export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/23.0.2
fi

ionic platform remove $PLATFORM
ionic platform add $PLATFORM
ionic build $PLATFORM
