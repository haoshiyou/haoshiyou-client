import {NavParams, NavController} from "ionic-angular";
import {Listing} from "../../models/listing";
import {IThreadService} from "../../services/chats/thread.service";
import {Thread, User} from "../../models/models";
import {IUserService} from "../../services/chats/user.service";
import {ChatWindowPage} from "../chats-tab/chat-window.page";
import {Inject, Component} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {IImageService} from "../../services/image.service";

declare let window:any;
declare let QRCode:any;

@Component({
  templateUrl: 'listing-detail.page.html',
})
export class ListingDetailPage {
  generateQrCode(link:string = "http://haoshiyou.org"):any {
    var el = document.getElementById('qrcode');

    // Clear existing children inside of the qrcode div.
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    var qrcode = new QRCode(el);
    qrcode.makeCode(link);
  }
  private listing:Listing;
  private owner:User;
  private meId:string;
  constructor(private threadService:IThreadService,
              private userService:IUserService,
              private nav:NavController,
              params:NavParams,
              private imageService:IImageService) {
    this.listing = params.data.listing;
    this.userService.observableUserById(this.listing.ownerId).subscribe((owner:User)=> {
      this.owner = owner;
    });
    this.userService.promiseMe().then((me:User)=>{
      if (me) {
        this.meId = me.id;
      }
    });
    this.userService.observableMeId().subscribe((meId:string)=>{
      this.meId = meId;
    });
  }

  edit() {
    this.nav.push(CreationPage, {listing: this.listing});
  }

  startChat() {
    // TODO(xinbenlv): handle when not yet logged in.
    let thread:Thread = <Thread>{};
    this.userService.promiseMe().then((me:User)=> {
      let newThreadId:string = me.id + '|' + this.listing.id;
      thread.id = newThreadId;
      thread.userIds = [me.id, this.listing.ownerId];
      return this.threadService.createThread(thread);
    }).then(() => {
      this.nav.push(ChatWindowPage, {thread: thread});
    });
  }

  // TODO(xinbenlv): merge with the same piece of code in image-grid.
  //noinspection JSUnusedLocalSymbols, used in HTML
  private showImage(imageId) {
    let el = document.getElementsByTagName('body');
    // TODO(xinbenlv): modify the viewerjs to customize the following
    // 1. click on background area to close
    let url = this.imageService.getUrlFromId(imageId, 0, 0);
    let viewer = new window.Viewer(el[0],
        {
          url: () => {
            return url;
          },
          inline:false,
          toolbar: true,
          title: false,
          movable: true,
          keyboard: false,
          navbar: true,
          hidden: () => {
            viewer.destroy();
          }
        });
    viewer.show();
  }
}
