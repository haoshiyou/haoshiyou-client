import {Injectable} from "@angular/core";
import {Message} from "../../models/models";
import {Observable} from "rxjs/Observable";
import {AngularFire} from "angularfire2/angularfire2";

@Injectable()
export class IMessageService {
  observableMessagesByThreadId(threadId:string):Observable<Message[]> {
    throw "Not implemented";
  }

  createMessage(message:Message):Promise<void> {
    throw "Not implemented";
  }
}

@Injectable()
export class FirebaseMessageService implements IMessageService {
  constructor(private af:AngularFire) {
  }

  observableMessagesByThreadId(threadId:string):Observable<Message[]> {
    return this.af.database.list("/messages", {
      query: {
        orderByChild: 'sentAt'
      }
    }).map(
        (messages:Message[])=> {
          return messages.filter((message:Message)=> {
            return threadId == message.threadId;
          });
        });
  }

  createMessage(message:Message):Promise<void> {
    if (message.id) {
      return this.af.database.object("/messages/" + message.id).update(message);
    } else {
      return this.af.database.list("/messages").push(message);
    }
  }

}

