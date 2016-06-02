import * as log4javascript from "log4javascript";
import {Logger} from "log4javascript";

export class LogService {
  private static defaultLogger:Logger;

  static getDefaultLogger():Logger {
    if (LogService.defaultLogger) {
      return LogService.defaultLogger;
    } else {
      let logger = log4javascript.getLogger();
      let appender = new log4javascript.BrowserConsoleAppender();
      let layout = new log4javascript.PatternLayout("%d{yyyy-MM-dd'T'HH:mm:ss.SSSZ} %-5p %m");
      appender.setLayout(layout);
      logger.addAppender(appender);
      logger.debug("Initialized DefaultLogger.");
      LogService.defaultLogger = logger;
      return logger;
    }
  }
}