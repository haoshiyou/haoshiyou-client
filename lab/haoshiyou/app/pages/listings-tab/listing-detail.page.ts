import {Page, NavParams, NavController} from "ionic-angular";
import {Listing} from "../../models/listing";
import {EnumMsgPipe} from "../../pipes/enum-msg.pipe.ts";
import {TimeFromNowPipe} from "../../pipes/time-from-now.pipe";
import {IThreadService} from "../../services/chats/thread.service";
import {Thread, User} from "../../models/models";
import {IUserService} from "../../services/chats/user.service";
import {ChatWindowPage} from "../chats-tab/chat-window.page";
import {ImageIdToUrlPipe} from "../../pipes/image-id-to-url.pipe";
import {ImageGridComponent} from "./image-grid.comp";
import {MapViewComponent} from "./map-view.comp";
import {loggerToken} from "../../services/log.service";
import {Inject} from "@angular/core";
import {Logger} from "log4javascript";
@Page({
  templateUrl: 'build/pages/listings-tab/listing-detail.page.html',
  pipes: [EnumMsgPipe, TimeFromNowPipe, ImageIdToUrlPipe],
  directives: [ImageGridComponent, MapViewComponent]
})
export class ListingDetailPage {
  private listing:Listing;
  private owner:User = <User>{ id: "1212", name: "good guy", avatarSrc: "http://placehold.it/50x50"};

  constructor(private threadService:IThreadService,
              private userService:IUserService,
              private nav:NavController,
              @Inject(loggerToken)
              private logger:Logger,
              params:NavParams) {
    this.listing = params.data.listing;
    this.logger.info(`Entering detail page for ${JSON.stringify(this.listing)}`);
    this.userService.observableUserById(this.listing.ownerId).subscribe((owner:User)=> {
      this.owner = owner;
    });

  }

  startChat() {
    // TODO(xinbenlv): handle when not yet logged in.
    let thread:Thread = <Thread>{};
    this.userService.promiseMe().then((me:User)=> {
      let newThreadId:string = me.id + '|' + this.listing.id;
      thread.id = newThreadId;
      thread.userIds = [me.id, this.listing.ownerId];
      this.logger.debug(`Creating chat thread ${JSON.stringify(thread)}`);
      return this.threadService.createThread(thread);
    }).then(() => {
      this.nav.push(ChatWindowPage, {thread: thread});
    });

  }

}