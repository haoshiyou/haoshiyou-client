import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {User, Thread, Message} from "../../models/models";
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Injectable()
export class MessageService {
  public markThreadAsRead:Subject<Thread> = new Subject<Thread>();

  fbMessages:FirebaseListObservable<Message[]>;

  constructor(private af:AngularFire) {
    this.fbMessages = af.database.list('/messages');

    // similarly, `markThreadAsRead` takes a Thread and then puts an operation
    // on the `updates` stream to mark the Messages as read
    this.markThreadAsRead
        .map((thread:Thread) => {
          return (messages:Message[]) => {
            return messages.map((message:Message) => {
              // note that we're manipulating `message` directly here. Mutability
              // can be confusing and there are lots of reasons why you might want
              // to, say, copy the Message object or some other 'immutable' here
              if (message.thread.id === thread.id) {
                message.isRead = true;
              }
              return message;
            });
          };
        });

  }

  // an imperative function call to this action stream
  public addMessage(message:Message):void {
    console.log("XXX Adding message");
    console.log(message);
    this.fbMessages.push(message); // TODO(xinbenlv): add authoriziation.
  }

  public messagesForThreadUser(thread:Thread, user:User):Observable<Message> {
    return this.fbMessages
        .concatMap((messages:Message[]) => {
          return Observable.from(messages.filter((message:Message) => {
            // belongs to this thread
            return (message.thread.id === thread.id) &&
                // and isn't authored by this user
                (message.author.id !== user.id);
          }));
        });
  }
}


