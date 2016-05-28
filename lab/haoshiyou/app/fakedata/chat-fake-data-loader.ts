/* tslint:disable:max-line-length */
import {User, Thread, Message} from "../models/models";
import {IMessageService} from "../services/chats/message.service.ts";
import {IThreadService} from "../services/chats/thread.service.ts";
import {IUserService} from "../services/chats/user.service.ts";
import {FAKE_USERS, FAKE_THREADS, FAKE_MESSAGES, USER_JULIET} from "./chat-fake-data";


export class ChatFakeDataLoader {
  static init(messagesService:IMessageService, threadService:IThreadService, userService:IUserService):void {
    FAKE_USERS.map((user:User) => userService.createUser(user));
    FAKE_THREADS.map((thread:Thread) => threadService.createThread(thread));
    // create the initial messages
    FAKE_MESSAGES.map((message:Message) => messagesService.createMessage(message));
    userService.setMe(USER_JULIET);
  }

}