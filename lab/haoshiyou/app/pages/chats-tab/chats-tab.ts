import {Page} from "ionic-angular";
import {provide, ChangeDetectionStrategy, OnInit} from "@angular/core";
import {ListingService, MockListingService} from "../../listing.service";
import {ChatExampleData} from "../../ChatExampleData";
import {MessagesService, ThreadsService, UserService} from "../../services/services";
import {ChatWindowPage} from "./chat-window.page";
import {FromNowPipe} from "../../util/FromNowPipe";
import {Observable} from "rxjs";
import {ChatThreadComp} from "./chat-thread.comp.ts";

@Page({
  selector: 'chat-app',
  templateUrl: 'build/pages/chats-tab/chats-tab.html',
  providers: [provide(ListingService, {useClass: MockListingService})],
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ChatWindowPage, ChatThreadComp],
  pipes: [FromNowPipe]
})
export class ChatsTabPage implements OnInit {
  threads:Observable<any>;

  constructor(private messagesService:MessagesService,
              private threadsService:ThreadsService,
              private userService:UserService) {
    this.threads = threadsService.orderedThreads;
  }

  ngOnInit() {
    ChatExampleData.init(this.messagesService, this.threadsService, this.userService);
  }
}
