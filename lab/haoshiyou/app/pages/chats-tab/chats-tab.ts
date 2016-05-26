import {Page, NavController} from "ionic-angular";
import {provide} from "@angular/core";
import {ListingService, MockListingService} from "../../listing.service";
import {ChatExampleData} from '../../ChatExampleData';
import {MessagesService, ThreadsService, UserService} from '../../services/services';
import {ChatNavBar} from "./ChatNavBar";
import {ChatThreads} from "./ChatThreads";
import {ChatWindow} from "./ChatWindow";
import {FromNowPipe} from "../../util/FromNowPipe";

@Page({
  selector: 'chat-app',
  template: `
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <chat-threads></chat-threads>
      <chat-window></chat-window>
    </div>
  </div>
  `,
  providers: [provide(ListingService, {useClass: MockListingService})],
  directives: [ChatNavBar, ChatThreads, ChatWindow],
  pipes:[FromNowPipe]
})
export class ChatsTabPage {
  constructor(private nav:NavController,
              public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public userService: UserService) {
    ChatExampleData.init(messagesService, threadsService, userService);
  }
}
