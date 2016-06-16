import * as log4javascript from "log4javascript";
import {Logger, LoggingEvent, Level} from "log4javascript";
import {OpaqueToken, Injectable} from "@angular/core";
import {Platform, Storage, LocalStorage} from "ionic-angular";
import {Device} from "ionic-native";
import {AngularFire} from "angularfire2/angularfire2";
import {uuid} from "../util/uuid";
import {ICredentialService} from "./credential.service";
export let loggerToken:OpaqueToken = new OpaqueToken("value");

declare let window:any;
declare let ga:any;

@Injectable()
export class LogService {
  private logger:Logger;

  constructor(platform:Platform, af:AngularFire, private cred:ICredentialService) {
    this.logger = log4javascript.getLogger();
    let layout = new log4javascript.PatternLayout("%d{yyyy-MM-dd'T'HH:mm:ss.SSSZ} %-5p %m");
    platform.ready().then(()=> {
      let fbAppender = new FbAppender(af);
      let browserAppender = new log4javascript.BrowserConsoleAppender();
      let gaAppender = new GaAppender();

      browserAppender.setLayout(layout);
      fbAppender.setLayout(layout);
      gaAppender.setLayout(layout);

      this.logger.addAppender(gaAppender);
      this.logger.addAppender(fbAppender);
      this.logger.addAppender(browserAppender);

      this.logger.debug("Initialized Logger.");
    });
    window.onerror = (msg, url, line, col, error) => {
      // Note that col & error are new to the HTML 5 spec and may not be
      // supported in every browser.  It worked for me in Chrome.
      var extra = !col ? '' : '\ncolumn: ' + col;
      extra += !error ? '' : '\nerror: ' + error;

      this.logger.error("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

      var suppressErrorAlert = true;
      // If you return true, then error alerts (like in older versions of
      // Internet Explorer) will be suppressed.
      return suppressErrorAlert;
    };
  }

  getLogger():Logger {
    return this.logger;
  }

  logEvent(eventCategory, eventAction) {
    ga('send', 'event', eventCategory, eventAction, this.cred.getEnv());
  }
}


export class FbAppender extends log4javascript.Appender {
  private deviceId:string;
  private device = {};
  private local:Storage = new Storage(LocalStorage);
  private ready:boolean = false;
  private entries = [];
  constructor(private af:AngularFire) {
    super();
    this.local.get('deviceId').then(deviceId => {
      if (deviceId) {
        this.deviceId = deviceId;
      }
      else {
        this.deviceId = Device.device.uuid ? Device.device.uuid : "browser-" + uuid();
        this.local.set('deviceId', this.deviceId);
      }
    }).then(()=> {
      this.device['device'] = Device.device;
      this.device['userAgent'] = window.navigator.userAgent;
      this.device['registerTime'] = [new Date().toISOString()];
      this.ready = true;
    });
  }

  /**
   * Appender-specific method to append a log message. Every appender object should implement this method.
   */
  append(loggingEvent:LoggingEvent):void {
    let entry = <LogEntry>{};
    entry.timeStampISOString = loggingEvent.timeStamp.toISOString();
    entry.timeStampInMilliseconds = loggingEvent.timeStampInMilliseconds;
    entry.level = loggingEvent.level;
    entry.messages = loggingEvent.messages;
    if (loggingEvent.exception) entry.exception = loggingEvent.exception;
    this.entries.push(entry);
    this.upload();
  };

  upload() {
    if (this.ready) {
      let tmpEntries = this.entries;
      this.entries = []; //clear
      for (let entry of tmpEntries) {
        this.af.database.list("/tmp/logs/device-" + this.deviceId).push(entry);
      }

      this.af.database.object("/tmp/devices/device-" + this.deviceId).take(1).toPromise().then((device:any)=> {
        if (device != null) {
          device.registerTime.push(new Date().toISOString());
          this.af.database.object(`/tmp/devices/device-${this.deviceId}`).update(device);
        } else {
          this.af.database.object(`/tmp/devices/device-${this.deviceId}`).set(this.device);
        }
      });


    }
  }

  setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (180 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
}

export class GaAppender extends log4javascript.Appender {
  private device:Device;

  constructor() {
    super();
    this.device = Device.device;
  }

  /**
   * Appender-specific method to append a log message. Every appender object should implement this method.
   */
  append(loggingEvent:LoggingEvent):void {
    let entry = <LogEntry>{};
    entry.timeStampISOString = loggingEvent.timeStamp.toISOString();
    entry.timeStampInMilliseconds = loggingEvent.timeStampInMilliseconds;
    entry.level = loggingEvent.level;
    entry.messages = loggingEvent.messages;
    if (loggingEvent.exception) entry.exception = loggingEvent.exception;
    ga('send', 'event', 'log', ''/* TODO(xinbenlv): add EventAction. */,
        entry.level, 1 /* event value */, entry);
  };
}

interface LogEntry {
  timeStampISOString:string;
  timeStampInMilliseconds:number;
  level:Level;
  messages:any[];
  exception?:Error;
}
