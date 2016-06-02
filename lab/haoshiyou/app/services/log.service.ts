import * as log4javascript from "log4javascript";
import {Logger, LoggingEvent, Level} from "log4javascript";
import {OpaqueToken, Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {Device} from "ionic-native";
import {AngularFire} from "angularfire2/angularfire2";
export let loggerToken:OpaqueToken = new OpaqueToken("value");

@Injectable()
export class LogService {
  private logger:Logger;

  constructor(platform:Platform, af:AngularFire) {
    this.logger = log4javascript.getLogger();
    platform.ready().then(()=> {
      this.logger.addAppender(new FbAppender(af));
      this.logger.addAppender(new GaAppender());
      let browserAppender = new log4javascript.BrowserConsoleAppender();
      let layout = new log4javascript.PatternLayout("%d{yyyy-MM-dd'T'HH:mm:ss.SSSZ} %-5p %m");
      browserAppender.setLayout(layout);
      this.logger.addAppender(browserAppender);
      this.logger.debug("Initialized Logger.");
    });

  }

  getLogger():Logger {
    return this.logger;
  }
}


export class FbAppender extends log4javascript.Appender {
  private device:Device;

  constructor(private af:AngularFire) {
    super();
    this.device = Device.device;
  }

  /**
   * Appender-specific method to append a log message. Every appender object should implement this method.
   */
  append(loggingEvent:LoggingEvent):void {
    let entry = <LogEntry>{};
    entry.timeStamp = loggingEvent.timeStamp;
    entry.level = loggingEvent.level;
    entry.messages = loggingEvent.messages;
    if (loggingEvent.exception) entry.exception = loggingEvent.exception;
    this.af.database.list("/tmp/logs/device-" + this.device.uuid).push(entry);
    this.af.database.object("/tmp/devices/device-" + this.device.uuid).update(this.device);
  };
}

declare let ga:any;

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
    entry.timeStamp = loggingEvent.timeStamp;
    entry.level = loggingEvent.level;
    entry.messages = loggingEvent.messages;
    if (loggingEvent.exception) entry.exception = loggingEvent.exception;
    ga('send', 'event', 'log', ''/* TODO(xinbenlv): add EventAction. */,
        entry.level, 1 /* event value */, entry);
  };
}

interface LogEntry {
  timeStamp:Date;
  level:Level;
  messages:any[];
  exception?:Error;
}
