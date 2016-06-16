// app/services/auth/auth.ts

import {Platform} from "ionic-angular";
import {Injectable, Inject} from "@angular/core";
import {loggerToken} from "./log.service";
import {Logger} from "log4javascript/log4javascript";
import {ICredentialService} from "./credential.service";

@Injectable()
export class NotificationService {

  private registrationId:string;
  private push:any/* PushNotification */;

  constructor(private platform:Platform,
              @Inject(loggerToken) private logger:Logger,
              private credService:ICredentialService) {
    this.logger.info("Constructor of NotificationService");
  }

  register(meId:string):Promise<string> {
    this.logger.info("Try register push notification");
    return this.platform.ready().then(() => {
      if (typeof PushNotification === "undefined") {
        this.logger.info("Not setting up push notification since there is no PushNotification");
        return Promise.resolve(null);
      } else {
        return new Promise<string>((resolve, reject)=> {
          this.logger.info("Registering push notification");
          let coreOpt = {
            "senderID": this.credService.get("FCM_SENDER_ID")
          };
          if (meId) {
            coreOpt["topics"] = [`user:${meId}`]; // TODO(xinbenlv): add group support
          }
          let opt;
          if (this.platform.is('android')) {
            coreOpt["icon"] = "drawable-xhdpi-icon";
            opt = {
              "android": coreOpt
            };
          } else if (this.platform.is('ios')) {
            coreOpt["alert"] = true;
            coreOpt["badge"] = true;
            coreOpt["sound"] = true;
            opt = {
              "ios": coreOpt
            }
          }
          this.logger.info(`Registering up push notification using opt=${JSON.stringify(opt)}`);
          this.push = PushNotification.init(opt);
          this.push.on('registration', (data) => {
            this.logger.info(`Push notification registration completed: registrationId=${data.registrationId}`);
            this.registrationId = data.registrationId;
            resolve(data.registrationId);
          });
          this.push.on('notification', (data) => {
            // TODO(xinbenlv): add navigate to specific thread;
            this.logger.info(`Received data from push notification: ${JSON.stringify(data)}`);
          });
          this.push.on('error', (e) => {
            this.logger.error('Push notification error!', e);
            reject(e);
          });

        });
      }


    });
  }

  unregister():Promise<void> {
    this.logger.info("Try unregister push notification");
    if (typeof PushNotification === "undefined") {
      this.logger.info("Not unregistering because PushNotification is undefined");
      return Promise.resolve();
    } else {
      this.logger.info("Unregistering push notificaiton");
      return new Promise((resolve, reject) => {
        this.push.unregister(resolve, reject);
      }).then(() => {
        this.logger.info("Done unregistering push notificaiton");
      });
    }
  }
}