# Haoshiyou project (ionic v2)

## Master Status 
[![Build Status](https://travis-ci.org/xinbenlv/rent.zzn.im.svg?branch=master)](https://travis-ci.org/xinbenlv/rent.zzn.im)

## Dev Status
[![Build Status](https://travis-ci.org/xinbenlv/rent.zzn.im.svg?branch=dev)](https://travis-ci.org/xinbenlv/rent.zzn.im)


This project is a project built with ionic v2

## Documents

Documentation lives in [docs](docs)

## Road Map

Released features are in [CHANGELOG.md](CHANGELOG.md),
Some of the old feature are in [OLD_CHANGELOG.md](OLD_CHANGELOG.md)

Future features are in the 
[issues](https://github.com/xinbenlv/rent.zzn.im/issues)

Security related bugs are filed under 
[security repo](https://github.com/xinbenlv/haoshiyou-security/issues)

TODO
- Client

  [O] Able to filter by Map View Boundary
      [O] update the schema to add lat and lng as separate field (loopback-connector-mysql)
  [ ] Show Price on Map Marker directly
  [ ] Thumbs Up and Favorite
  [ ] display numbers of Views, numbers of Bumps
  [ ] Map inside of the details page
  [ ] Admin mark bad post
  [ ] 地图闪动和重新调整中心和zoom的问题
  
- Server

  [ ] Add location approximate radius into schema
  [ ] Deprecate a few fields

- Bot

  [ ] Refactor to use Google Pub/Sub 
  [ ] Improving extraction logic to handle the price
  [ ] Support extracting location approximate radius
  [ ] Throttle Bot Message Sending.
  [ ] Use cronjob schedule for bot recurring work.

  