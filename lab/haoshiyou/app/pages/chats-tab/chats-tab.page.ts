import {Page} from "ionic-angular";
import {OnInit, OnDestroy} from "@angular/core";
import {IMessageService, IThreadService, IUserService} from "../../services/services";
import {ChatWindowPage} from "./chat-window.page";
import {TimeFromNowPipe} from "../../pipes/time-from-now.pipe.ts";
import {ChatThreadComp} from "./chat-thread.comp.ts";
import {Thread, User} from "../../models/models";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

/**
 * TODO(xinbenlv): optimize the messages update process and ChangeDetection for optimal user experience.
 */
@Page({
  selector: 'chat-app',
  templateUrl: 'build/pages/chats-tab/chats-tab.page.html',
  directives: [ChatWindowPage, ChatThreadComp],
  pipes: [TimeFromNowPipe]
})
export class ChatsTabPage implements OnInit, OnDestroy {

  private me:User;
  private subjectThreads:Subject<Thread[]> = new Subject<Thread[]>();
  private subscription:Subscription;

  constructor(private messagesService:IMessageService,
              private threadsService:IThreadService,
              private userService:IUserService) {
    // we need this and below both, depending on whether UserService has doen initialize.
    // TODO(xinbenlv): there should be a way to optimize it
    this.retrieveMe();

  }

  ngOnInit() {

    this.userService.observableMe().subscribe((me:User) => {
      this.retrieveMe();
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private retrieveMe():void {
    this.me = this.userService.getMe();
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.threadsService.obserbableThreadsByUserId(this.me.id).subscribe(this.subjectThreads);
  }
}
