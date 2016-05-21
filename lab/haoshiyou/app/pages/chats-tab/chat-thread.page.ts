import {Page, NavParams} from "ionic-angular";
import {ChatThread, ChatItem} from "../../chat";
import {ChatItemWidget} from "./chat-item.widget";
import {UserId} from "../../user";
import {ChatBox} from "./chat-box";


@Page({
  templateUrl: 'build/pages/chats-tab/chat-thread.page.html',
  directives:[ChatItemWidget, ChatBox]
})
export class ChatThreadPage {
  private chatThread:ChatThread;
  private myUserId:UserId='sender1';
  // TODO(xinbenlv): change from array to appropriate data structure to
  // better represent the chatroom layout
  private chatItems:ChatItem[];
  /**
   * Based on params or id load a listing page.
   * @param params
   */
  constructor(params:NavParams) {
    this.chatThread = params.data.chatThread;
    this.chatItems = CHAT_ITEMS;
  }
}

// TODO(xinbenlv): move to MockChatSerivce.
const CHAT_ITEMS: ChatItem[] = [
  {
    id: 'a0307f34-c0eb-4427-b521-afd0c2093c4a',
    threadId: 'thread1',
    senderId: 'sender1',
    textMsg: 'how much?'
  },
  {
    id: 'a0307f34-c0eb-4427-b521-afd0c2093c4a',
    threadId: 'thread1',
    senderId: 'sender2',
    textMsg: '500 per month'
  }
];