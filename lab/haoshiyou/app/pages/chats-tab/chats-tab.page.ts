import {Page} from "ionic-angular";
import {provide, ChangeDetectionStrategy, OnInit} from "@angular/core";
import {ListingService, MockListingService} from "../../services/listing.service.ts";
import {ChatExampleData} from "../../ChatExampleData";
import {MessageService, ThreadService, UserService} from "../../services/services";
import {ChatWindowPage} from "./chat-window.page";
import {TimeFromNowPipe} from "../../pipes/time-from-now.pipe.ts";
import {Observable} from "rxjs";
import {ChatThreadComp} from "./chat-thread.comp.ts";

@Page({
  selector: 'chat-app',
  templateUrl: 'build/pages/chats-tab/chats-tab.page.html',
  providers: [provide(ListingService, {useClass: MockListingService})],
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ChatWindowPage, ChatThreadComp],
  pipes: [TimeFromNowPipe]
})
export class ChatsTabPage implements OnInit {
  threads:Observable<any>;

  constructor(private messagesService:MessageService,
              private threadsService:ThreadService,
              private userService:UserService) {
    this.threads = threadsService.orderedThreads;
  }

  ngOnInit() {
    ChatExampleData.init(this.messagesService, this.threadsService, this.userService);
  }
}
