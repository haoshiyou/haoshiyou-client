#!/usr/bin/env bash

if [[ $TRAVIS_OS_NAME == 'osx' ]]; then
  export PLATFORM="ios"
else
  export PLATFORM="android"
fi
ionic platform remove $PLATFORM
ionic platform add $PLATFORM
ionic build android $PLATFORM
