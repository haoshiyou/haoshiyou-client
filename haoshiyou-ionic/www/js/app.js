angular.module('haoshiyou', [
  'ionic', 'ionic.wizard',
  'haoshiyou.controllers',
  'haoshiyou.services', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform,  $rootScope, $log) {
  $ionicPlatform.ready(function() {
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

  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
    $log.debug('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
  });

  $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
    $log.debug('$stateChangeError - fired when an error occurs during transition.');
    $log.debug(arguments);
  });

  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    $log.debug('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
  });

  $rootScope.$on('$viewContentLoaded',function(event){
    $log.debug('$viewContentLoaded - fired after dom rendered',event);
  });

  $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
    console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
    $log.debug(unfoundState, fromState, fromParams);
  });
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
      controller: 'LoginCtrl'
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
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.my', {
    url: '/my',
    views: {
      'tab-my': {
        templateUrl: 'templates/tab-my.html',
        controller: 'MyCtrl'
      }
    }
  })
  .state('tab.team', {
      url: '/team',
      views: {
        'tab-team': {
          templateUrl: 'templates/tab-team.html',
          controller: 'TeamCtrl'
        }
      }
    })

  .state('tab.detail', {
    url: '/detail/:guid',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-detail.html',
        controller: 'DetailCtrl'
      }
    }
  })

  .state('tab.qrcode', {
    url: '/qrcode',
    views: {
      'tab-qrcode': {
        templateUrl: 'templates/tab-qrcode.html',
        controller: 'QrCodeCtrl'
      }
    }
  })
  .state('tab.add', {
    url: '/add',
    views: {
      'tab-dash': {
        templateUrl: 'templates/edit.html',
        controller: 'EditCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

}).config(function(LoopBackResourceProvider){

    // Change the URL where to access the LoopBack REST API server
    // LoopBackResourceProvider.setUrlBase('http://0.0.0.0:3000/api');

});