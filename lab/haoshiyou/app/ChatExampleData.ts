/* tslint:disable:max-line-length */
import {User, Thread, Message} from "./models/models";
import {MessageService} from "./services/chats/message.service.ts";
import {ThreadService} from "./services/chats/thread.service.ts";
import {UserService} from "./services/chats/user.service";
import * as moment from "moment";

// the person using the app us Juliet
let me:User = new User('Juliet', 'http://placehold.it/100x100?text=Juliet');
let ladycap:User = new User('Lady Capulet', 'http://placehold.it/100x100?text=Capulet');
let echo:User = new User('Echo Bot', 'http://placehold.it/100x100?text=Echo+Bot');
let rev:User = new User('Reverse Bot', 'http://placehold.it/100x100?text=Reverse+Bot');
let wait:User = new User('Waiting Bot', 'http://placehold.it/100x100?text=Waiting+Bot');

let tLadycap:Thread = new Thread('tLadycap', ladycap.name, ladycap.avatarSrc);
let tEcho:Thread = new Thread('tEcho', echo.name, echo.avatarSrc);
let tRev:Thread = new Thread('tRev', rev.name, rev.avatarSrc);
let tWait:Thread = new Thread('tWait', wait.name, wait.avatarSrc);

let initialMessages:Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.',
    thread: tLadycap
  }),
  new Message({
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.',
    thread: tLadycap
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `I\'ll echo whatever you send me`,
    thread: tEcho
  }),
  new Message({
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: `I\'ll reverse whatever you send me`,
    thread: tRev
  }),
  new Message({
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: tWait
  }),
];

export class ChatExampleData {
  static init(messagesService:MessageService,
              threadsService:ThreadService,
              userService:UserService):void {
    // TODO make `messages` hot
    messagesService.fbMessages.subscribe(() => ({}));

    // set "Juliet" as the current user
    userService.setCurrentUser(me);

    // create the initial messages
    initialMessages.map((message:Message) => messagesService.addMessage(message));

    threadsService.setCurrentThread(tEcho);
  }

}