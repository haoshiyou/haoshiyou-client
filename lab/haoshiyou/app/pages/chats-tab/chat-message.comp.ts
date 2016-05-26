import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/services";
import {FromNowPipe} from "../../util/FromNowPipe";
import {User, Message} from "../../models";

@Component({
  inputs: ['message'],
  selector: 'chat-message',
  pipes: [FromNowPipe],
  templateUrl: 'build/pages/chats-tab/chat-message.comp.html'
})
export class ChatMessageComp implements OnInit {
  message:Message;
  currentUser:User;
  incoming:boolean;

  constructor(public userService:UserService) {
  }

  ngOnInit():void {
    this.userService.currentUser
        .subscribe(
            (user:User) => {
              this.currentUser = user;
              if (this.message.author && user) {
                this.incoming = this.message.author.id !== user.id;
              }
            });
  }

}