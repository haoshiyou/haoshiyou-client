import {Page} from "ionic-angular";
import {ChatsTabPage} from "../chats-tab/chats-tab";
import {ListingsTabPage} from "../listings-tab/listings-tab.ts";
import {SettingsTabPage} from "../settings-tab/settings-tab";

import {MessagesService, ThreadsService} from '../../services/services';
import {Message, Thread} from '../../models';
import * as _ from 'underscore';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html',

})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root:any = ChatsTabPage;
  tab2Root:any = ListingsTabPage;
  tab3Root:any = SettingsTabPage;

  unreadMessagesCount: number;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService) {
  }

  ngOnInit(): void {
    this.messagesService.messages
        .combineLatest(
            this.threadsService.currentThread,
            (messages: Message[], currentThread: Thread) =>
                [currentThread, messages] )

        .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
          this.unreadMessagesCount =
              _.reduce(
                  messages,
                  (sum: number, m: Message) => {
                    let messageIsInCurrentThread: boolean = m.thread &&
                        currentThread &&
                        (currentThread.id === m.thread.id);
                    if (m && !m.isRead && !messageIsInCurrentThread) {
                      sum = sum + 1;
                    }
                    return sum;
                  },
                  0);
        });
  }
}
