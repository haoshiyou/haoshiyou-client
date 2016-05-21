import {Component, Input} from "angular2/core";
import {ChatItem} from "../../chat";

@Component({
  selector: 'chat-item',
  templateUrl: 'build/pages/chats-tab/chat-item.widget.html',
})
export class ChatItemWidget {
  @Input() chatItem:ChatItem;

  constructor() {
  }

}