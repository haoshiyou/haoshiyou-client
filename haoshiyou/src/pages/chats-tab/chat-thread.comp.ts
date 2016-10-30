import {Component, Input, OnChanges, SimpleChange} from "@angular/core";
import {Thread, User} from "../../models/models";
import {NavController} from "ionic-angular/index";
import {ChatWindowPage} from "./chat-window.page";
import {IUserService} from "../../services/chats/user.service";
import 'rxjs/Rx'; // used by Observable.take()

@Component({
  selector: 'chat-thread',
  templateUrl: 'chat-thread.comp.html'
})
export class ChatThreadComp implements OnChanges {
  ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
    if (changes['thread']) {
      Promise.all(this.thread.userIds.map((id:string)=> {
        return this.userService.observableUserById(id).take(1).toPromise();
      })).then((users:any[]) => {
        users = <Array<User>>users;
        this.participants = users.map((user:User)=> {
              return user.name;
            }).join("、");
      });
    }
  }

  @Input() thread:Thread;
  @Input() badgeCounter:number;
  participants:string;

  constructor(private nav:NavController, private userService:IUserService) {
  }

  gotoThread():void {
    this.nav.push(ChatWindowPage, {thread: this.thread});

  }
}
