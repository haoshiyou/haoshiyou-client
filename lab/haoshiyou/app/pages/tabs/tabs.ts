import {Page} from "ionic-angular";
import {ChatsTabPage} from "../chats-tab/chats-tab.page";
import {ListingsTabPage} from "../listings-tab/listings-tab.page.ts";
import {SettingsTabPage} from "../settings-tab/settings-tab.page";
import {IMessageService, IThreadService} from "../../services/services";

@Page({
  templateUrl: 'build/pages/tabs/tabs.html',

})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root:any = ChatsTabPage;
  tab2Root:any = ListingsTabPage;
  tab3Root:any = SettingsTabPage;

  unreadMessagesCount:number;

  constructor(public messagesService:IMessageService,
              public threadsService:IThreadService) {
  }

  ngOnInit():void {
    // TODO(zzn): add unread message counts
  }
}
