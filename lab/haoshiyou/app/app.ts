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
import {FIREBASE_PROVIDERS, AngularFire, FirebaseUrl} from "angularfire2";
import {User} from "./models/models";
import {IListingService} from "./services/listings/listing.service";
import {FirebaseListingService} from "./services/listings/fb-listing.service";
import {MapService} from "./services/map.service";
import {FAKE_LISTINGS} from "./fakedata/listing-fake-data";
import {Listing} from "./models/listing";
import {ChatFakeDataLoader} from "./fakedata/chat-fake-data-loader";
import {LogService, loggerToken} from "./services/log.service";
import {IImageService, CloudinaryImageService} from "./services/image.service";
import {ICredentialService, StaticCredentialService} from "./services/credential.service";

declare let ga:any;

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {
    tabSubPages: true
  }, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [
    provide(ICredentialService, {useClass: StaticCredentialService}),
    provide(FirebaseUrl, {
      useFactory: (credService:ICredentialService) => {
        return credService.get('FIREBASE_BASE_URL');
      }, deps: [ICredentialService]
    }),
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
    provide(IImageService, {useClass: CloudinaryImageService}),
    LogService,

    provide(loggerToken, {
      useFactory: (logService:LogService) => {
        return logService.getLogger();
      }, deps: [LogService]
    }),
    MapService,
    FIREBASE_PROVIDERS
  ]
})
export class MyApp {

  rootPage:any = TabsPage;
  F
  constructor(private platform:Platform,
              private af:AngularFire,
              private userService:IUserService,
              private threadService:IThreadService,
              private messageService:IMessageService,
              private authService:AuthService,
              private credService:ICredentialService) {
    ga('create', this.credService.get('GOOGLE_ANALYTICS_PROPERTY_ID'), 'none');
    ga('send', 'pageview');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    authService.userObservable().subscribe((authUser:User) => {
      // TODO(xinbenlv): on condition create user.
      if (!authUser) {
        userService.setMeId(null);
      } // logout
      else { // login
        userService.observableUserById(authUser.id).take(1).toPromise().then((user:User)=> {
          if (!user) {
            userService.createUser(authUser).then(()=> {
              userService.setMeId(user.id);
            });
          } else {
            userService.setMeId(user.id);
          }
        });
      }

    });
    // this.loadFakeData();
  }

  loadFakeData() {
    ChatFakeDataLoader.init(this.messageService, this.threadService, this.userService);
    FAKE_LISTINGS.map((listing:Listing) => {
      this.af.database.object("/listings/" + listing.id).set(listing);
    });
  }
}