import {Page, NavController} from "ionic-angular";
import {provide} from "@angular/core";
import {ListingService, MockListingService} from "../../listing.service";
import {ChatThread} from "../../chat";
import {ChatThreadPage} from "./chat-thread.page";

@Page({
  templateUrl: 'build/pages/chats-tab/chats-tab.html',
  providers: [provide(ListingService, {useClass: MockListingService})]
})
export class ChatsTabPage {
  private chatThreads: ChatThread[];
  constructor(private nav:NavController) {
    this.chatThreads = CHAT_THREADS;
  }

  gotoThread(chatThread: ChatThread) {
    this.nav.push(ChatThreadPage, {chatThread: chatThread});
  }
}

/*
 //TODO(xinbenlv): move to MockChatService
 */
const CHAT_THREADS: ChatThread[] = [{
  id: "ce8c78f4-2506-4e3b-b19f-570d16631a29",
  title: "what ever 1",
  lastestMsg: "something important",
  participants: ["f6e11329-0457-4044-a059-359e8bb4831a", "38c4c14a-f111-4a83-90ff-ec1bd7fe19ac"]
}, {
  id: "56c1620b-b6a3-4449-903e-222b4bd403af",
  title: "what ever 2",
  lastestMsg: "something also important",
  participants: ["53ed6f69-0a15-4e82-8654-a4e9cb8f8a8b", "cb80aa4e-0de0-4519-811f-224da837bd1f"]
}, {
  id: "416ceda0-9bce-4e63-87da-bbd4cf24f337",
  title: "what ever 3",
  lastestMsg: "something very very important",
  participants: ["f3d3f853-fb76-404b-8ade-722db1e19aa3", "a11439ac-eea2-4ab8-94a5-8fec3812d6a1"]
}];