import { Page } from 'ionic-angular';
import { ListingService } from '../../listing.service';

@Page({
  templateUrl: 'build/pages/chats-tab/chats-tab.html',
  providers: [ ListingService ]
})
export class ChatsTabPage {
  constructor() {

  }
}

class Chat {
  participants: number[];
}