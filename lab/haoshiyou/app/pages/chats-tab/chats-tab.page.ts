import {Page} from "ionic-angular";
import {ChangeDetectionStrategy, OnInit} from "@angular/core";
import {ChatExampleData} from "../../ChatExampleData";
import {IMessageService, IThreadService, IUserService} from "../../services/services";
import {ChatWindowPage} from "./chat-window.page";
import {TimeFromNowPipe} from "../../pipes/time-from-now.pipe.ts";
import {Observable} from "rxjs";
import {ChatThreadComp} from "./chat-thread.comp.ts";
import {Thread, User} from "../../models/models";

@Page({
  selector: 'chat-app',
  templateUrl: 'build/pages/chats-tab/chats-tab.page.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ChatWindowPage, ChatThreadComp],
  pipes: [TimeFromNowPipe]
})
export class ChatsTabPage implements OnInit {
  observableThreads:Observable<Thread[]>;
  private me:User;

  constructor(private messagesService:IMessageService,
              private threadsService:IThreadService,
              private userService:IUserService) {
    userService.observableMe().subscribe((me:User) => {
      this.me = me;
      this.observableThreads = threadsService.obserbableThreadsByUserId(this.me.id);
    });
  }

  ngOnInit() {
    ChatExampleData.init(this.messagesService, this.threadsService, this.userService);
  }
}
