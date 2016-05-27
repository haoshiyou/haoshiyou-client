import {Injectable} from "@angular/core";
import {Subject, BehaviorSubject, Observable} from "rxjs";
import {Thread, Message} from "../../models/models";
import {MessageService} from "./message.service.ts";
import * as _ from "underscore";

@Injectable()
export class ThreadService {

  /** `threads` is a observable that contains the most up to date list of threads in the format of a
   * map from string to Thread
   */
  private threads:Observable<{ [key:string]:Thread }>;

  // `orderedThreads` contains a newest-first chronological list of threads
  orderedThreads:Observable<Thread[]>;

  // `currentThread` contains the currently selected thread
  currentThread:Subject<Thread> =
      new BehaviorSubject<Thread>(new Thread());

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages:Observable<Message[]>;

  constructor(private messagesService:MessageService) {

    this.threads = messagesService.fbMessages
        .map((messages:Message[]) => {
          let threads:{[key:string]:Thread} = {};
          // Store the message's thread in our accumulator `threads`
          messages.map((message:Message) => {
            threads[message.thread.id] = threads[message.thread.id] ||
                message.thread;

            // Cache the most recent message for each thread
            let messagesThread:Thread = threads[message.thread.id];

            if (!messagesThread.lastMessageText ||
                messagesThread.lastMessageSentAt < message.sentAt) {
              messagesThread.lastMessageText = message.text;
            }
          });
          return threads;
        }).publishReplay(1).refCount();

    this.orderedThreads = this.threads
        .map((threadGroups:{ [key:string]:Thread }) => {
          let threads:Thread[] = _.values(threadGroups);
          return _.sortBy(threads, (t:Thread) => t.lastMessageSentAt).reverse();
        });

    this.currentThreadMessages = this.currentThread
        .combineLatest(messagesService.fbMessages,
            (currentThread:Thread, messages:Message[]) => {
              if (currentThread && messages.length > 0) {
                return _.chain(messages)
                    .filter((message:Message) =>
                        (message.thread.id === currentThread.id))
                    .map((message:Message) => {
                      message.isRead = true;
                      return message;
                    })
                    .value();
              } else {
                return [];
              }
            });

    this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }

  public setCurrentThread(newThread:Thread):void {
    this.currentThread.next(newThread);
  }

}