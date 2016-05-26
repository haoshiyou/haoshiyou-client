import {OnInit, ElementRef, ChangeDetectionStrategy} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/common";
import {MessagesService, ThreadsService, UserService} from "../../services/services";
import {Observable} from "rxjs";
import {User, Thread, Message} from "../../models";
import {Page} from "ionic-angular/index";
import {ChatMessageComp} from "./chat-message.comp";


@Page({
  selector: 'chat-window',
  directives: [ChatMessageComp,
    FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'build/pages/chats-tab/chat-window.page.html'
})
export class ChatWindowPage implements OnInit {
  messages:Observable<any>;
  currentThread:Thread;
  draftMessage:Message;
  currentUser:User;

  constructor(public messagesService:MessagesService,
              public threadsService:ThreadsService,
              public userService:UserService,
              public el:ElementRef) {
  }

  ngOnInit():void {
    this.messages = this.threadsService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
        (thread:Thread) => {
          this.currentThread = thread;
        });

    this.userService.currentUser
        .subscribe(
            (user:User) => {
              this.currentUser = user;
            });

    this.messages
        .subscribe(
            (messages:Array<Message>) => {
              setTimeout(() => {
                this.scrollToBottom();
              });
            });
  }

  onEnter(event:any):void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage():void {
    let m:Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom():void {
    //TODO(xinbenlv): implement scroll
  }

}