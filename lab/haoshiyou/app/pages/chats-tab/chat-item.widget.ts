import {Component, Input} from "@angular/core";
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