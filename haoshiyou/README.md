# Haoshiyou project (ionic v2)

## Master Status 
[![Build Status](https://travis-ci.org/xinbenlv/haoshiyou-client.svg?branch=master)](https://travis-ci.org/xinbenlv/haoshiyou-client)

## Dev Status
[![Build Status](https://travis-ci.org/xinbenlv/haoshiyou-client.svg?branch=dev)](https://travis-ci.org/xinbenlv/haoshiyou-client)


This project is a project built with ionic v2

## Documents

Documentation lives in [docs](docs)

## Road Map

Released features are in [CHANGELOG.md](CHANGELOG.md),
Some of the old feature are in [OLD_CHANGELOG.md](OLD_CHANGELOG.md)

Future features are in the 
[issues](https://github.com/xinbenlv/haoshiyou-client/issues)

Security related bugs are filed under 
[security repo](https://github.com/xinbenlv/haoshiyou-security/issues)

TODO
- Client

  [O] Able to filter by Map View Boundary
      [O] update the schema to add lat and lng as separate field (loopback-connector-mysql)
  [O] Show Price on Map Marker directly
  [ ] Thumbs Up and Favorite
  [ ] display numbers of Views, numbers of Bumps
  [ ] Map inside of the details page
  [ ] Admin mark bad post
  [O] 地图闪动和重新调整中心和zoom的问题
  
  [ ] 2018-11-17 新功能 - 一键置顶
  [ ] 2018-11-17 微信登陆，置顶的时候可以用微信支付或者点数购买
  
- Server

  [ ] Add location approximate radius into schema
  [ ] Deprecate a few fields

- Bot
  [ ] Improving extraction logic to handle the price
  [ ] Support extracting location approximate radius
  [ ] Throttle Bot Message Sending.
  [ ] Use cronjob schedule for bot recurring work.

## Onboarding
### All Teammates Onboarding
1. Communication Channels
 - Slack http://haoshiyou.slack.com
 - Google Groups http://googlegroups.com/haoshiyou-client
 
2. Shared File Storages
 - Google Drive
 - Dropbox

### Software Engineer-Specific On-Boarding 
 - Go through Stack Diagram
 - Go through code repo for 3 main components
   - `haoshiyou-client`
   - `haoshiyou-server`
   - `haoshiyou-ai`
   - `haoshiyou-bot` / `haoshiyou-bot-new-padchat`
 
### UX-Specific On-Boarding
  - Go through Product Philosophy
  - Go through Client Invisionapp  
  
