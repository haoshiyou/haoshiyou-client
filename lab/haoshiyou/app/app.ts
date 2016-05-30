import {App, Platform} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {TabsPage} from "./pages/tabs/tabs";
import {provide} from "@angular/core";
import {Http} from "@angular/http";
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {AuthService} from "./services/auth.service.ts";
import {IMessageService, FirebaseMessageService} from "./services/chats/message.service.ts";
import {IThreadService, FirebaseThreadService} from "./services/chats/thread.service.ts";
import {IUserService, FirebaseUserService} from "./services/chats/user.service";
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from "angularfire2";
import {User} from "./models/models";
import {IListingService} from "./services/listings/listing.service";
import {FirebaseListingService} from "./services/listings/fb-listing.service";
import {MapService} from "./services/map.service";

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
    provide(IUserService, {useClass: FirebaseUserService}),
    provide(IThreadService, {useClass: FirebaseThreadService}),
    provide(IMessageService, {useClass: FirebaseMessageService}),
    provide(IListingService, {useClass: FirebaseListingService}),
    MapService,
    FIREBASE_PROVIDERS,
    defaultFirebase('haoshiyou-dev.firebaseio.com'),
  ]
})
export class MyApp {

  rootPage:any = TabsPage;

  constructor(private platform:Platform,
              private af:AngularFire,
              private userSerivce:IUserService,
              private threadService:IThreadService,
              private messageService:IMessageService,
              private authService:AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    authService.userObservable().subscribe((user:User) => {
      // TODO(xinbenlv): on condition create user.
      userSerivce.createUser(user);
      userSerivce.setMe(user);
    });
  }
}

// TODO(xinbenlv): primary feature in orders
// - DONE Create, Save, Update, View, Sort a listing
// - DONE LogIn, LogOut, Password Reset
// - DONE Map Marker Listing Navigation
// - DONE Chat
// - DONE City and Zip Pipe
// - Create chat from listing.
// - Push cycle
// - Image picker
// - Share to WeChat