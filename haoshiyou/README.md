# Haoshiyou project (ionic v2)

This project is a project built with ionic v2

## Documents

Documentation lives in [docs](docs)

## Road Map

Released features are in [CHANGELOG.md](CHANGELOG.md)

(A task without assignee is xinbenlv@)
- Release 4: Performance and Reliability
  - Bug
    - When sending a message, both sender and receiver got a 
    push notification.
    - Android version adding new image will flash quit.
  - Testing structure
  - Add performance profiling related logging
  - About, Version, Env and Control
  - Cosmetic
    - Display my listing and my chat message in a light blue to 
    - Add avatar to listing left

- BLOCKED
  - Listing list on the left depends on Split View for Ionic V2. A few
  ionic forum threads have mentioned this
    - [Ionic 2 Split View](https://forum.ionicframework.com/t/ionic-2-split-view/49282)
    - [Ion-menu always open for tablet?](https://forum.ionicframework.com/t/ion-menu-always-open-for-tablet/48327)
    - [Ionic 2 Roadmap](https://docs.google.com/document/d/1Qlc5X2eJyOB0izkFlH7KJ5BmMi0MeXUZRHJHt3hS6Wo/edit#heading=h.puikk611x4pd)
  - Firebase Realtime DB Security Rules: blocked on 
   [auth0-angular2](github.com/auth0/auth0-angular2)
  - DeepLinking blocked on @angular/router to 
   [finalize](http://angularjs.blogspot.com/2016/06/improvements-coming-for-routing-in.html),
  - Shared to WeChat blocked on DeepLinking