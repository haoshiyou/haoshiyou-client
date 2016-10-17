import {Component, Input} from "@angular/core";
import {TimeFromNowPipe} from "../../pipes/time-from-now.pipe";
import {User, Message} from "../../models/models";

@Component({
  selector: 'chat-message',
  templateUrl: 'chat-message.comp.html'
})
export class ChatMessageComp {

  @Input() message:Message;
  @Input() author:User;
  @Input() incoming:boolean;

}
