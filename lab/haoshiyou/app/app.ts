import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {provide} from '@angular/core';
import {Http} from '@angular/http'
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './services/auth.service.ts';
import {MessageService} from "./services/chats/message.service.ts";
import {ThreadService} from "./services/chats/thread.service.ts";
import {UserService} from "./services/chats/user.service";


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {
    tabSubPages: true
  }, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig(), http);
      },
      deps: [Http]
    }),
    AuthService,
    MessageService,
    ThreadService,
    UserService
  ]
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

// TODO(xinbenlv): primary feature in orders
// - Create, Save, Update, View, Sort a listing
// - Translator
// - LogIn, LogOut, Password Reset
// - Map Marker Listing Navigation
// - Chat
// - Share to WeChat