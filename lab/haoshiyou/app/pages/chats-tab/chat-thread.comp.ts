import {Component, OnInit, Input} from "@angular/core";
import {ThreadsService} from "../../services/services";
import {Thread} from "../../models";
import {NavController} from "ionic-angular/index";
import {ChatWindowPage} from "./chat-window.page";

@Component({
  selector: 'chat-thread',
  templateUrl: 'build/pages/chats-tab/chat-thread.comp.html'
})
export class ChatThreadComp implements OnInit {
  @Input() thread:Thread;
  selected:boolean = false;

  constructor(public threadsService:ThreadsService,
              private nav:NavController) {
  }

  ngOnInit():void {
    this.threadsService.currentThread
        .subscribe((currentThread:Thread) => {
          this.selected = currentThread &&
              this.thread &&
              (currentThread.id === this.thread.id);
        });
  }

  gotoThread():void {
    this.threadsService.setCurrentThread(this.thread);

    this.nav.push(ChatWindowPage);
  }
}
