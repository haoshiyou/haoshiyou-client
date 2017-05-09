import {Platform} from "ionic-angular";
import {TabsPage} from "../pages/tabs/tabs";
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "../services/auth.service";
import {IMessageService} from "../services/chats/message.service";
import {IThreadService} from "../services/chats/thread.service";
import {IUserService} from "../services/chats/user.service";
import {User} from "../models/models";
import {NotificationService} from "../services/notfication.service";
import 'rxjs/Rx'; // used by Observable.take()
import {Env} from "./env";
import {LoopBackConfig} from "../loopbacksdk/lb.config";
import {HsyListing} from "../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../loopbacksdk/services/custom/HsyListing";
import { CodePush } from '@ionic-native/code-push';
declare let ga:any;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class HaoshiyouApp {
  rootPage:any = TabsPage;
  private hsyListing:HsyListing = new HsyListing();
  constructor(private platform:Platform,
              private userService:IUserService,
              private threadService:IThreadService,
              private messageService:IMessageService,
              private authService:AuthService,
              private notificationService:NotificationService,
              private http:Http,
              private hsyListingApi:HsyListingApi,
              private codePush: CodePush
              ) {
    LoopBackConfig.setBaseURL('http://haoshiyou-server-dev.herokuapp.com');
    LoopBackConfig.setApiVersion('api');
    this.platform.ready().then(()=> {
      if (this.platform.is(`cordova`)){
        this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
        let downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
        this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
      }
      ga('create', Env.configGoogleAnalytics.propertyId, 'none');
      ga('send', 'pageview');

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
      // Schedule a token refresh on app start up
      authService.startupTokenRefresh();

      // Setup notification
      authService.userObservable().subscribe((user:User)=> {
        if (user == null) {
          this.notificationService.unregister();
        } else {
          this.notificationService.register(user.id).then((regId:string) => {
            if (regId) {
              return this.userService.addRegistrationId(regId);
            } else {
              //this.logger.debug("no regid, return directly");
              return Promise.resolve(); // TODO(xinbenlv): need to do anything special?
            }
          });

        }
      });

    });

  }
}

