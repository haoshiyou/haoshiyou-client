angular.module('haoshiyou', [
  'ionic',
  'ngCordova',
  'lbServices',
  'cloudinary',
  'haoshiyou.controllers',
  'haoshiyou.PostCtrls',
  'haoshiyou.services',
  'haoshiyou.filters',
  'uiGmapgoogle-maps',
  'ionic-datepicker',
  'ngAutocomplete',
  "uuid4",
  "ngDropzone",
])

.run(function($ionicPlatform,  $rootScope, Logger, WeChatService) {

  $rootScope.appReady = {status:false};
  $ionicPlatform.ready(function() {

    console.log('ionic Platform Ready');
    $rootScope.appReady.status = true;

    $rootScope.$apply();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });

  WeChatService.init();
})

.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyB16sGmIekuGIvYOfNoW9T44377IU2d2Es',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
  })

  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })


  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'PostListCtrl'
      }
    }
  })
  .state('tab.view', {
    params: {postId: null},
    views: {
      'tab-dash': {
        templateUrl: 'templates/view.html',
        controller: 'ViewCtrl'
      }
    },
  })
  .state('tab.my', {

    url: '/my',
    views: {
      'tab-my': {
        templateUrl: 'templates/tab-my.html',
        controller: 'PostListCtrl'
      }
    }
  })
  .state('tab.edit', {
    params: {postId: null},
    views: {
      'tab-my': {
        templateUrl: 'templates/edit.html',
        controller: 'EditOrCreateCtrl'
      }
    },
  })


  .state('view', {
    url: '/view/:postId',
    templateUrl: 'templates/view.html',
    controller: 'ViewCtrl',
  })
  .state('tab.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'templates/tab-info.html'
      }
    }
  })
  .state('tab.qrcode',{
    views: {
      'tab-info': {
        templateUrl: 'templates/qrcode.html'
      }
    }
  }).state('tab.team', {
    views: {
      'tab-info': {
        templateUrl: 'templates/team.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');


}).config(function(LoopBackResourceProvider, $compileProvider, BACKEND){

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://' + BACKEND + '/api');
    // LoopBackResourceProvider.setUrlBase('http://haoshiyou-dev.herokuapp.com/api');

    // TODO(zzn): is the imgSrcSanitizationWhitelist really needed
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|content|file|assets-library):/);


}).constant("BACKEND", "dev.haoshiyou.org")
.run(function(Logger){
  var CONST_PARSE_ID = "RPjt04MBMl3rzzEKBGKUpP7KHFXAsomtDbr9cS0y";
  var CONST_PARSE_KEY = "DSqWg9xElC6mI1PwtPWzzeIPQYUXPGTOC66nT82h";
  Parse.initialize(CONST_PARSE_ID, CONST_PARSE_KEY);
  Logger.trackerFunctions["ga"] = function(action, dimensions) {
    ga('send', 'event', 'button', 'click', action, dimensions);
  };
  Logger.trackerFunctions["ga"] = function(action, dimensions) {
    ga('send', 'event', 'button', 'click', action, dimensions);
  };

  Logger.trackerFunctions["parse"] = function(action, dimensions) {
    var ParseTracking = Parse.Object.extend("ParseTracking");
    var parseTracking = new ParseTracking();
    for(var key in dimensions) {
      parseTracking.set(key, dimensions[key]);
    }
    parseTracking.set("action", action);
    parseTracking.save();
  };
  Logger.loggerFunctions["parse"] = function(msg, level, data) {
    var ParseLogging = Parse.Object.extend("ParseLogging");
    var parseLogging = new ParseLogging();
    parseLogging.set("msg", msg);
    parseLogging.set("level", level);
    for(var key in data) {
      parseLogging.set(key, data[key]);
    }
    parseLogging.save();
  };
});