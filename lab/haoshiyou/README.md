# Haoshiyou project (ionic v2)

[TOC]

This project is a project built with ionic v2

## Note

Most of the packages here are included at the time of 2016-05-22. at the time the ionicv2 is still in it's beta
Angular2 is just moving to to rc1, splitting how packages are included, and ionic@beta has not yet moved to
the angular2 rc. Once ionic@beta is moving to angular2 rc, the following will be refactored accordingly.

* AngularFire2 at alpha14

(AngularFire2)[https://github.com/angular/angularfire2/tree/16c573b0144b3c38165407744b21e504421086d2]

### Install typings definition from DefinitelyTyped

For example

```
typings install dt~firebase --save --global
```

Install 


### Run 

```
ionic run -lcs --debug ios --address=localhost
```

xinbenlv@

## Road Map
TODO(xinbenlv): primary feature in orders
 - DONE Create, Save, Update, View, Sort a listing
 - DONE LogIn, LogOut, Password Reset
 - DONE Map Marker Listing Navigation
 - DONE Chat
 - DONE City and Zip Pipe
 - DONE Create chat from listing.
 - DONE Image picker
 - DONE Google Map on Detail Page
 - DONE Handle most frequent bad cases
   -  - DONE No login
   -  - DONE No internet connection
 - Rlease 1: MVP for Early Adopter
   -  - DONE Strip to production credentials
   -  - DONE Turn Off FB and LinkedIn Auth0 signin.
   -  - DONE Disable Web Upload Image, Stop nav-back after upload image failure.
   -  - DONE Add icon, splash screen, webpage icon
   -  - Sanitize
   -  - Publish on Android and iOS for beta testing.
 - Rlease 2: MVP for Growth
   -  - Push notification
   -  - New message counting
   -  - Browser upload pictures
   -  - Facebook and LinkedIn Sign-In Callback Fixing
   -  - Share to WeChat
 - Release 3: Performance and UX tweak 
 - Authentication