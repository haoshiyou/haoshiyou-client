// app/services/auth/auth.ts

import {Platform} from "ionic-angular";
import {Injectable, Inject} from "@angular/core";
import {ICredentialService} from "./credential.service";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Push} from "ionic-native";

@Injectable()
export class NotificationService {
  public static TOPIC_LISTING:string = "listing";
  private registrationId:string;
  private push:any/* PushNotification, no typed definition yet. */;

  constructor(private platform:Platform,
              private credService:ICredentialService,
              private http:Http) {
  }

  register(meId:string):Promise<string> {
    return this.platform.ready().then(() => {
      if (typeof Push === "undefined") {
        return Promise.resolve(null);
      } else {
        return new Promise<string>((resolve, reject)=> {
          let coreOpt = {
            "senderID": this.credService.getCred("FCM_SENDER_ID"),
            "topics": [NotificationService.TOPIC_LISTING]
          };
          if (meId) {
            //coreOpt["topics"] = [`user:${meId}`]; // TODO(xinbenlv): add group support
          }
          let opt;
          if (this.platform.is('android')) {
            coreOpt["icon"] = "icon";
            opt = {
              "android": coreOpt
            };
          } else if (this.platform.is('ios')) {
            coreOpt["gcmSandbox"] = true; // without sandbox it will not be able to received out.
            coreOpt["alert"] = true;
            coreOpt["badge"] = true;
            coreOpt["sound"] = true;
            opt = {
              "ios": coreOpt
            }
          }
          this.push = Push.init(opt);
          this.push.on('registration', (data) => {
            this.registrationId = data.registrationId;
            resolve(data.registrationId);
          });
          this.push.on('notification', (data) => {
          });
          this.push.on('error', (e) => {
            reject(e);
          });

        });
      }


    });
  }

  unregister():Promise<void> {
    if (typeof Push === "undefined") {
      return Promise.resolve();
    } else {
      return new Promise((resolve, reject) => {
        this.push.unregister(resolve, reject);
      }).then(() => {
      });
    }
  }

  sendPushMessage(regIds:string[], msg:string, userName:string):Promise<any> {
    let url = 'https://fcm.googleapis.com/fcm/send';
    let body = JSON.stringify({
      "registration_ids":regIds,
      "notification":{
        "title": `好室友(haoshiyou)`,
        "body":`${userName}: ${msg}`
      }
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':`key=${this.credService.getCred('FCM_KEY')}`
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options).take(1).toPromise().then((ret)=>{
    }).catch((e)=>{
    });
  }

  sendTopicMessage(topic:string, msg:string):Promise<any> {
    let url = 'https://fcm.googleapis.com/fcm/send';
    let body = JSON.stringify({
      "to": `/topics/${topic}`,
      "notification": {
        "title": `好室友(haoshiyou)`,
        "body": msg
      }
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `key=${this.credService.getCred('FCM_KEY')}`
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options).take(1).toPromise().then((ret)=> {
    }).catch((e)=> {
    });
  }
}
