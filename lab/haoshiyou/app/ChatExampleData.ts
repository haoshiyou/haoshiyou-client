/* tslint:disable:max-line-length */
import {User, Thread, Message} from "./models/models";
import {IMessageService} from "./services/chats/message.service.ts";
import * as moment from "moment";
import {IThreadService} from "./services/chats/thread.service";
import {IUserService} from "./services/chats/user.service";

// the person using the app us Juliet
let me:User = new User('tmp-juliet', 'Juliet', 'http://placehold.it/100x100?text=Juliet');
let ladycap:User = new User('tmp-capulet', 'Lady Capulet', 'http://placehold.it/100x100?text=Capulet');
let tLadycap:Thread = new Thread('tmp-thread-me-capulet', ['tmp-juliet', 'tmp-capulet'], new Date(), "");
let tXinbenlvToZZN:Thread = new Thread('tmp-thread-xinbenlv-zzn',
    [
      'eGluYmVubHZAZ21haWwuY29t'/*xinbenlv@gmail.com*/,
      'enpuK2xpbmtlZGluQHp6bi5pbQ=='/*zzn+linkedin@zzn.im*/
    ], new Date(), "");
let initialMessages:Message[] = [
  new Message('tmp-message1', 'Hi How are you?',
      moment().subtract(45, 'minutes').toDate(),
      'tmp-juliet',
      'tmp-thread-me-capulet'
  ),

  new Message('tmp-message2', 'Fine thank you!.',
      moment().subtract(46, 'minutes').toDate(),
      'tmp-capulet',
      'tmp-thread-me-capulet'
  ),
];

let initialUsers:User[] = [me, ladycap];

let initialThreads:Thread[] = [tLadycap, tXinbenlvToZZN];

export class ChatExampleData {
  static init(messagesService:IMessageService, threadService:IThreadService, userService:IUserService):void {

    initialUsers.map((user:User) => userService.createUser(user));
    initialThreads.map((thread:Thread) => threadService.createThread(thread));
    // create the initial messages
    initialMessages.map((message:Message) => messagesService.createMessage(message));
    userService.setMe(me);
  }

}