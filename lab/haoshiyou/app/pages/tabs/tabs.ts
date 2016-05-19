import {Page} from 'ionic-angular';
import {ChatsTabPage} from '../chats-tab/chats-tab';
import {ListingsTabPage} from '../listings-tab/listings-tab.ts';
import {Page3} from '../settings-tab/settings-tab';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ChatsTabPage;
  tab2Root: any = ListingsTabPage;
  tab3Root: any = Page3;
}
