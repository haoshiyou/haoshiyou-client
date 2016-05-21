import {Component, Input} from "angular2/core";
import {ChatThread} from "../../chat";
@Component({
  selector: 'chat-box',
  templateUrl: 'build/pages/chats-tab/chat-box.html',
})
export class ChatBox {
  @Input()
  private chatThread: ChatThread;
  constructor() {
  }

}