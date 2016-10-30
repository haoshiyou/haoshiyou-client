import {OnInit, OnDestroy, Output, EventEmitter, Component} from "@angular/core";
import {IMessageService, IThreadService, IUserService} from "../../services/services";
import {Thread, User} from "../../models/models";
import {Subscription} from "rxjs/Subscription";

/**
 * TODO(xinbenlv): optimize the messages update process and ChangeDetection for optimal user experience.
 */
@Component({
  selector: 'chat-tab',
  templateUrl: 'chats-tab.page.html',
})
export class ChatsTabPage implements OnInit, OnDestroy {
  private meId:string;
  private threads:Thread[];
  private subscription:Subscription;
  private badgeCounters:number[];
  @Output()
  allCounters = new EventEmitter<number[]>();
  constructor(private messagesService:IMessageService,
              private threadsService:IThreadService,
              private userService:IUserService) {
    this.userService.observableMeId().subscribe((meId:string) => {
      this.retrieveMe(meId);
    });
  }

  ngOnInit() {
    this.userService.promiseMe().then((me:User)=> {
      this.retrieveMe(me ? me.id : null);
    });
  }


  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private retrieveMe(meId:string):void {
    this.meId = meId;
    if (!meId) {
      return;
    }
    if (this.subscription) this.subscription.unsubscribe();
    this.threadsService.obserbableThreadsByUserId(meId).subscribe((threads:Thread[])=> {
      this.threads = threads;
      this.badgeCounters = new Array<number>();

      // Set up badge counter update;
      this.threads.map((thread:Thread, index:number)=> {
        return this.messagesService.observableBadgeCounter(thread.id,
            thread.lastCheckTime ? thread.lastCheckTime[meId] : 0).subscribe((counter:number)=> {
          this.badgeCounters[index] = counter;
          this.allCounters.emit(this.badgeCounters);
        });
      });
    });
  }
}
