// app/services/auth/auth.ts

import {Platform} from "ionic-angular";
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Push, PushObject} from "@ionic-native/push";
import {Env} from "../app/env";
declare let console;
declare let JSON;

@Injectable()
export class NotificationService {
  public static TOPIC_LISTING:string = "listing";
  private registrationId:string;
  private pushObject: PushObject;
  constructor(private platform:Platform,
              private http:Http,
              private push:Push) {

  }

  register(meId:string):Promise<string> {
    return this.platform.ready().then(() => {
      if (!this.platform.is('cordova')) {
        console.log('XXX NotificationService is not cordova');
        return Promise.resolve(null);
      } else {
        console.log('XXX NotificationService is cordova');
        return new Promise<string>((resolve, reject)=> {
          let coreOpt = {
            "senderID": Env.configFirebaseCloudMessage.senderId,
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
          this.pushObject= this.push.init(opt);
          this.pushObject.on('registration').subscribe((data) => {
            this.registrationId = data['registrationId'];
            resolve(data['registrationId']);
          });
          this.pushObject.on('notification').subscribe((data) => {
          });
          this.pushObject.on('error').subscribe((e) => {
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
      if(this.pushObject) return this.pushObject.unregister();
    }

  }

  sendPushMessage(regIds:string[], msg:string, userName:string):Promise<any> {
    let url = 'https://fcm.googleapis.com/fcm/send';
    let body = JSON.stringify({
      "registration_ids":regIds,
      "notification":{
        "title": `好室友™(haoshiyou)`,
        "body":`${userName}: ${msg}`
      }
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':`key=${Env.configFirebaseCloudMessage.key}`
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
        "title": `好室友™(haoshiyou)`,
        "body": msg
      }
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `key=${Env.configFirebaseCloudMessage.key}`
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options).take(1).toPromise().then((ret)=> {
    }).catch((e)=> {
    });
  }
}
