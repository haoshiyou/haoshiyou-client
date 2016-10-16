import {Platform, ionicBootstrap} from "ionic-angular";
import {TabsPage} from "./pages/tabs/tabs";
import {provide, Inject, Component} from "@angular/core";
import {Http, HTTP_PROVIDERS} from "@angular/http";
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
import {LogService, loggerToken} from "./services/log.service";
import {IImageService, CloudinaryImageService} from "./services/image.service";
import {ICredentialService, JsonCredentialService} from "./services/credential.service";
import {Logger} from "log4javascript/log4javascript";
import {NotificationService} from "./services/notfication.service";

declare let ga:any;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  rootPage:any = TabsPage;
  constructor(private platform:Platform,
              private af:AngularFire,
              private userService:IUserService,
              private threadService:IThreadService,
              private messageService:IMessageService,
              private authService:AuthService,
              private credService:ICredentialService,
              @Inject(loggerToken) private logger:Logger,
              private notificationService:NotificationService,
              private http:Http,
              private logService:LogService) {
    this.platform.ready().then(()=> {
      ga('create', this.credService.getCred('GOOGLE_ANALYTICS_PROPERTY_ID'), 'none');
      ga('send', 'pageview');
      this.logService.logEvent('app', 'start');

      if (authService.getUser()) {
        userService.setMeId(AuthService.createHsyUser(authService.getUser()).id);
      }
      // Setup UserService
      authService.userObservable().subscribe((authUser:User) => {
        // TODO(xinbenlv): on condition create user.
        if (!authUser) {
          userService.setMeId(null);
        } // logout
        else { // login
          userService.observableUserById(authUser.id).take(1).toPromise().then((user:User)=> {
            if (!user) {
              userService.createOrUpdateUser(authUser).then(()=> {
                userService.setMeId(authUser.id);
              });
            } else {
              userService.setMeId(user.id);
            }
          });
        }
      });

      // Setup notification
      authService.userObservable().subscribe((user:User)=> {
        this.logger.debug(`Push notification gets user= ${JSON.stringify(user)}`);
        if (user == null) {
          this.notificationService.unregister();
        } else {
          this.notificationService.register(user.id).then((regId:string) => {
            if (regId) {
              return this.userService.addRegistrationId(regId);
            } else {
              this.logger.debug("no regid, return directly");
              return Promise.resolve(); // TODO(xinbenlv): need to do anything special?
            }
          });

        }
      });

    });

  }
}



// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/

ionicBootstrap(MyApp, [
  provide(ICredentialService, {useClass: JsonCredentialService}),
  provide(FirebaseUrl, {
    useFactory: (credService:ICredentialService) => {
      return credService.getCred('FIREBASE_BASE_URL');
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
  NotificationService,
  LogService,

  provide(loggerToken, {
    useFactory: (logService:LogService) => {
      return logService.getLogger();
    }, deps: [LogService]
  }),
  MapService,
  FIREBASE_PROVIDERS,
  HTTP_PROVIDERS
], {
      tabsHideOnSubPages: true
}, // http://ionicframework.com/docs/v2/api/config/Config/
);
