import {
    OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef,
    Component
} from "@angular/core";
import {IMessageService, IThreadService, IUserService} from "../../services/services";
import {User, Thread, Message} from "../../models/models";
import {NavParams, Content} from "ionic-angular";
import {uuid} from "../../util/uuid";
import {Subscription} from "rxjs/Subscription";
import {NotificationService} from "../../services/notfication.service";

export class MessageInfo {
  message:Message;
  author:User;
  incoming:boolean;
}

@Component({
  selector: 'chat-window',
  templateUrl: 'chat-window.page.html'
})
export class ChatWindowPage implements OnInit, OnDestroy {
  @ViewChild(Content) content:Content;
  currentThread:Thread;
  title:string;
  messageInfos:MessageInfo[] = [];
  subscription:Subscription;
  draftMessageText:string;

  me:User;
  cacheAuthors:{[id:string]:User} = {}
  cacheMessages:{[id:string]:Message} = {};
  constructor(private messagesService:IMessageService,
              private threadsService:IThreadService,
              private userService:IUserService,
              private el:ElementRef, private params:NavParams,
              private cd:ChangeDetectorRef,
              private ns:NotificationService) {
    this.currentThread = params.data.thread;
  }

  ngOnInit():void {
    this.userService.promiseMe().then((me:User)=> {
      this.me = me;
      if (!this.currentThread.lastCheckTime) this.currentThread.lastCheckTime = {};
      this.currentThread.lastCheckTime[me.id] = Date.now();
      return this.threadsService.createThread(this.currentThread);
    });
    this.subscription = this.messagesService.observableMessagesByThreadId(
        this.currentThread.id).subscribe((messages:Message[]) => {
      let diffMessages:Message[] = [];
      for (let m of messages) {
        if (!this.cacheMessages[m.id]) {
          diffMessages.push(m);
          this.cacheMessages[m.id] = m;
        }
      }
      let promises:Promise<User>[] = [];
      for (let m of diffMessages) {
        if (!this.cacheAuthors[m.authorId]) {
          promises.push(this.userService.observableUserById(m.authorId).take(1).toPromise());
        }
      }
      Promise.all(promises).then((users:any[]) => {
        users = <Array<User>>users;
        users.map((user:User)=> {
          this.cacheAuthors[user.id] = user;
        });
      }).then(()=> {
        let diffMessageInfos:MessageInfo[] = [];
        for (let m of diffMessages) {
          diffMessageInfos.push(<MessageInfo>{
            message: m,
            author: this.cacheAuthors[m.authorId],
            incoming: m.authorId != this.me.id
          });
        }
        this.messageInfos = this.messageInfos.concat(diffMessageInfos);
        this.cd.detectChanges();
        this.scrollToBottom();
      });
    });
  }

  ngOnDestroy():void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onEnter(event:any):void {
    this.sendMessage();
  }

  sendMessage():void {
    let m:Message = <Message>{
      id: uuid(),
      text: this.draftMessageText,
      sentAt: Date.now(),
      authorId: this.me.id,
      threadId: this.currentThread.id
    };
    let notificationRegIds:string[] = [];
    this.messagesService.createMessage(m).then(()=>{
      this.currentThread.lastMessageText = m.text;
      return this.threadsService.createThread(this.currentThread);
    }).then(()=> {
      let promises:Promise<void>[] = [];
      for(let userId of this.currentThread.userIds) {
        promises.push(this.userService.observableUserById(userId).take(1).toPromise()
            .then((user:User)=>{
              if(user.id != this.me.id && user.regIds) {
                notificationRegIds = notificationRegIds.concat(user.regIds);
              };
            }).catch((e)=>{

            }));
      }
      Promise.all(promises).then(()=>{
        this.ns.sendPushMessage(notificationRegIds, m.text, this.me.name).then(()=>{
        });
      });
    });
    this.draftMessageText = "";
    this.scrollToBottom();
  }

  private scrollToBottom():void {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.scrollBottom, 0);
  }
}
