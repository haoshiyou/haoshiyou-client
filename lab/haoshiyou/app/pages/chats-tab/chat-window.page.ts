import {OnInit, OnDestroy, ElementRef, ChangeDetectionStrategy, ViewChild} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/common";
import {IMessageService, IThreadService, IUserService} from "../../services/services";
import {Observable} from "rxjs";
import {User, Thread, Message} from "../../models/models";
import {Page, NavParams, Content} from "ionic-angular/index";
import {ChatMessageComp} from "./chat-message.comp";
import {uuid} from "../../util/uuid";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {Observer} from "rxjs/Observer";
@Page({
  selector: 'chat-window',
  directives: [ChatMessageComp,
    FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'build/pages/chats-tab/chat-window.page.html'
})
export class ChatWindowPage implements OnInit, OnDestroy {
  @ViewChild(Content) content: Content;
  currentThread:Thread;
  messages:Subject<Message[]> = new Subject<Message[]>();
  subscription:Subscription;
  draftMessageText:string;

  me:User;

  constructor(private messagesService:IMessageService,
              private threadsService:IThreadService,
              private userService:IUserService,
              private el:ElementRef, private params:NavParams) {
    this.currentThread = params.data.thread;
  }

  ngOnInit():void {
    this.me = this.userService.getMe();
    this.userService.observableMe().subscribe();
    let o = this.messagesService.observableMessagesByThreadId(
        this.currentThread.id);
    this.subscription = o.subscribe(this.messages);
    o.subscribe(()=>{this.scrollToBottom();});
  }
  ngOnDestroy():void {
    if(this.subscription) this.subscription.unsubscribe();
  }

  onEnter(event:any):void {
    this.sendMessage();
  }

  sendMessage():void {
    let m:Message = new Message(uuid(), this.draftMessageText, new Date(), this.me.id, this.currentThread.id);
    this.messagesService.createMessage(m);
    this.draftMessageText = "";
    this.scrollToBottom();
  }

  private scrollToBottom():void {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.scrollBottom, 0);
  }
}