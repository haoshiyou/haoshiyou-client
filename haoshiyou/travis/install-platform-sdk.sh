#!/usr/bin/env bash
if [[ $TRAVIS_OS_NAME == 'osx' ]]; then
  brew update
else
  wget http://dl.google.com/android/android-sdk_r24.4-linux.tgz
  tar -xvf android-sdk_r24.4-linux.tgz
  echo y | ./android-sdk-linux/tools/android update sdk --no-ui --all --filter platform-tools
  echo y | ./android-sdk-linux/tools/android update sdk --no-ui --all --filter build-tools-23.0.2
  echo y | ./android-sdk-linux/tools/android update sdk --no-ui --all --filter android-23
  echo y | ./android-sdk-linux/tools/android update sdk --no-ui --all --filter extra-android-support
  echo y | ./android-sdk-linux/tools/android update sdk --no-ui --all --filter extra-android-m2repository
  echo y | ./android-sdk-linux/tools/android update sdk --no-ui --all --filter extra-google-m2repository
fi
