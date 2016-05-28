import {Component, Input} from "@angular/core";
import {Thread} from "../../models/models";
import {NavController} from "ionic-angular/index";
import {ChatWindowPage} from "./chat-window.page";

@Component({
  selector: 'chat-thread',
  templateUrl: 'build/pages/chats-tab/chat-thread.comp.html'
})
export class ChatThreadComp {
  @Input() thread:Thread;

  constructor(private nav:NavController) {
  }

  gotoThread():void {
    this.nav.push(ChatWindowPage, {thread: this.thread});
  }
}
