import {Component, OnInit, Input} from "@angular/core";
import {IUserService} from "../../services/services";
import {TimeFromNowPipe} from "../../pipes/time-from-now.pipe";
import {User, Message} from "../../models/models";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'chat-message',
  pipes: [TimeFromNowPipe],
  templateUrl: 'build/pages/chats-tab/chat-message.comp.html'
})
export class ChatMessageComp implements OnInit {
  ngOnInit():any {
    this.author = this.userService.observableUserById(this.message.authorId);
  }

  @Input() message:Message;
  author:Observable<User>;
  me:User;

  incoming():boolean {
    return this.message.authorId != this.me.id;
  }

  constructor(private userService:IUserService) {
    this.me = userService.getMe();
    console.assert(this.me != null);
  }

}