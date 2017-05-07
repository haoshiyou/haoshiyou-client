import {NavParams, NavController} from "ionic-angular";
import {IThreadService} from "../../services/chats/thread.service";
import {Thread, User} from "../../models/models";
import {IUserService} from "../../services/chats/user.service";
import {ChatWindowPage} from "../chats-tab/chat-window.page";
import {Component, AfterViewInit} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {IImageService} from "../../services/image.service";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import {HsyUserApi} from "../../loopbacksdk/services/custom/HsyUser";
import {HsyUser} from "../../loopbacksdk/models/HsyUser";
declare let window:any;
declare let QRCode:any;

@Component({
  selector: 'listing-detail',
  templateUrl: 'listing-detail.page.html'
})
export class ListingDetailPage implements AfterViewInit {
  listing:HsyListing;
  owner:User;
  meId:string;
  public loading:boolean = true;
  ngAfterViewInit():void {

    console.log("XXX ngAfterViewInit");
  // TODO(xinbenlv): add back later
  //   console.log("XXX generateQrCode code");
  //   this.generateQrCode();
  }
  async ngOnInit():Promise<void> {
    console.log("XXX ListingDetailPage load 2");
    if (this.params.data['listing'] != null) {
      console.log(`XXXX param = ${JSON.stringify(this.params)}`);
      this.listing = this.params.data.listing;
      this.params.data.id = this.listing.uid;
      this.initListeners();
      this.loading = false;
    } else {
      let id = this.params.data.id;
      let listing = await this.api.findById(id)
          .take(1)
          .toPromise() as HsyListing;
      this.listing = listing;
      this.initListeners();
      this.loading = false;

      console.log("XXX Finish isLoading");
    }
  }

  constructor(private threadService:IThreadService,
              private userService:IUserService,
              private nav:NavController,
              private params:NavParams,
              private imageService:IImageService,
              private api:HsyListingApi,private hsyUserApi:HsyUserApi) {}

  edit() {
    this.nav.push(CreationPage, {listing: this.listing});
  }

  private async initListeners() {
    console.log(`XXX DEBUG start init listeners`);
    let ownernHsyUser:HsyUser = await this.hsyUserApi
        .findById<HsyUser>(this.listing.ownerId).take(1).toPromise();
    console.log(`XXX DEBUG ownernHsyUser = ${JSON.stringify(ownernHsyUser)}`);

    this.owner = {
      id: ownernHsyUser.id,
      name: ownernHsyUser.name,
      avatarSrc: ownernHsyUser.avatarId, // TODO(xinbenlv): update the URL using cloudinary
      regIds: []
    };
    console.log(`loaded user ${JSON.stringify(ownernHsyUser)}`);

    this.userService.promiseMe().then((me:User)=> {
      if (me) {
        this.meId = me.id;
      }
    });
    this.userService.observableMeId().subscribe((meId:string)=> {
      this.meId = meId;
    });
  }
  startChat() {
    // TODO(xinbenlv): handle when not yet logged in.
    let thread:Thread = <Thread>{};
    this.userService.promiseMe().then((me:User)=> {
      let newThreadId:string = me.id + '|' + this.listing.uid;
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
