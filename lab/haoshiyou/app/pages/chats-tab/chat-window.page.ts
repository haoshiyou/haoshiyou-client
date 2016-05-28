import {OnInit, ElementRef, ChangeDetectionStrategy} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/common";
import {IMessageService, IThreadService, IUserService} from "../../services/services";
import {Observable} from "rxjs";
import {User, Thread, Message} from "../../models/models";
import {Page, NavParams} from "ionic-angular/index";
import {ChatMessageComp} from "./chat-message.comp";
import {uuid} from "../../util/uuid";


@Page({
  selector: 'chat-window',
  directives: [ChatMessageComp,
    FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'build/pages/chats-tab/chat-window.page.html'
})
export class ChatWindowPage implements OnInit {
  currentThread:Thread;
  messages:Observable<Message[]>;
  draftMessageText:string;

  me:User;

  constructor(private messagesService:IMessageService,
              private threadsService:IThreadService,
              private userService:IUserService,
              private el:ElementRef, private params:NavParams) {
    this.currentThread = params.data.thread;
    this.me = userService.getMe();
    this.messages = messagesService.observableMessagesByThreadId(this.currentThread.id);
  }

  ngOnInit():void {

  }

  onEnter(event:any):void {
    this.sendMessage();
  }

  sendMessage():void {
    let m:Message = new Message(uuid(), this.draftMessageText, new Date(), this.me.id, this.currentThread.id);
    this.messagesService.createMessage(m);
    this.draftMessageText = "";
  }

}