import {Page} from "ionic-angular";
import {OnInit, OnDestroy, Inject} from "@angular/core";
import {IMessageService, IThreadService, IUserService} from "../../services/services";
import {ChatWindowPage} from "./chat-window.page";
import {TimeFromNowPipe} from "../../pipes/time-from-now.pipe.ts";
import {ChatThreadComp} from "./chat-thread.comp.ts";
import {Thread, User} from "../../models/models";
import {Subscription} from "rxjs/Subscription";
import {loggerToken} from "../../services/log.service";
import {Logger} from "log4javascript";
import {AuthService} from "../../services/auth.service";

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

  private meId:string;
  private threads:Thread[];
  private subscription:Subscription;

  constructor(private messagesService:IMessageService,
              private threadsService:IThreadService,
              private userService:IUserService,
              @Inject(loggerToken) private logger:Logger,
              private auth:AuthService) {
    this.userService.observableMeId().subscribe((meId:string) => {
      this.logger.info(`Receiving me in the chat tab. me=${JSON.stringify(meId)}`);
      this.retrieveMe(meId);
    });
  }

  ngOnInit() {

    this.userService.promiseMe().then((me:User)=> {
      this.logger.info(`Agressively getting me me in the chat tab. me=${JSON.stringify(me)}`);
      this.retrieveMe(me ? me.id : null);
    });
  }


  ngOnDestroy() {
    this.logger.debug(`ChatsTabPage ngOnDestroy`);
    if (this.subscription) this.subscription.unsubscribe();
  }

  private retrieveMe(meId:string):void {
    this.meId = meId;
    if (!meId) {
      return;
    }
    this.logger.info(`Setting me in retrieve me. me=${JSON.stringify(this.meId)}`);
    if (this.subscription) this.subscription.unsubscribe();
    this.threadsService.obserbableThreadsByUserId(meId).subscribe((threads:Thread[])=> {
      this.threads = threads;
    });
  }
}
