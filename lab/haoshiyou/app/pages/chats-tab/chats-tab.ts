import {Page} from "ionic-angular";
import {provide} from "angular2/core";
import {ListingService, MockListingService} from "../../listing.service";

@Page({
  templateUrl: 'build/pages/chats-tab/chats-tab.html',
  providers: [provide(ListingService, {useClass: MockListingService})]
})
export class ChatsTabPage {
  constructor() {

  }
}

class Chat {
  participants:number[];
}