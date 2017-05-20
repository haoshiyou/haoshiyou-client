import {NavParams, NavController, AlertController} from "ionic-angular";
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
import {ListingsTabPage} from "./listings-tab.page";
declare let window:any;
declare let QRCode:any;
declare let ga:any;

@Component({
  selector: 'listing-detail',
  templateUrl: 'listing-detail.page.html'
})
export class ListingDetailPage {
  listing: HsyListing;
  owner: User;
  meId: string;
  title: string;
  public loading: boolean = true;

  async ionViewWillEnter() {
    if (this.listing == null) await this.loadListing();
    ga('set', 'page', `/listing-detail.page.html#${this.listing.uid}`);
    ga('send', 'pageview');
    if (this.nav.length() == 1) {
      ga('send', 'event', {
        eventCategory: 'go-to',
        eventAction: 'listing-detail',
        eventLabel: 'direct-url'
      });
    }
  }
  async loadListing() {
    if (this.params.data['listing'] != null) {
      this.listing = this.params.data.listing;
    } else {
      let id = this.params.data.id;
      this.listing = await this.api.findById(id)
          .take(1)
          .toPromise() as HsyListing;
    }
    this.params.data.id = this.listing.uid;
    this.title = `好室友™帖子：` + this.listing.title;
    await this.initListeners();
    this.loading = false;
  }

  async ngOnInit():Promise<void> {
    await this.loadListing();
  }

  constructor(private threadService:IThreadService,
              private userService:IUserService,
              private nav:NavController,
              private params:NavParams,
              private imageService:IImageService,
              private api:HsyListingApi,private hsyUserApi:HsyUserApi,
              private alertCtrl: AlertController) {}
  async backToMain() {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'listings-tab',
      eventLabel: 'direct-url'
    });
    await this.nav.push(ListingsTabPage);
  }
  async edit() {
    await this.nav.push(CreationPage, {listing: this.listing});
  }

  private async initListeners() {
    let ownerHsyUser:HsyUser = await this.hsyUserApi
        .findById<HsyUser>(this.listing.ownerId).take(1).toPromise();
    this.owner = {
      id: ownerHsyUser.id,
      name: ownerHsyUser.name,
      avatarSrc: ownerHsyUser.avatarId, // TODO(xinbenlv): update the URL using cloudinary
      regIds: []
    };
    console.log(`loaded user ${JSON.stringify(ownerHsyUser)}`);

    this.userService.promiseMe().then((me:User)=> {
      if (me) {
        this.meId = me.id;
      }
    });
    this.userService.observableMeId().subscribe((meId:string)=> {
      this.meId = meId;
    });
  }

  async fakeClaimAndEdit() {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'fake-claim-and-edit',
    });
    let alert = this.alertCtrl.create({
      title: '新版"认领并编辑"功能正在建设中',
      buttons: [
        {
          text: 'OK',
        },
      ]
    });
    await alert.present();
  }

  async fakeStartChat() {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'fake-start-chat',
    });
    let alert = this.alertCtrl.create({
      title: '新版"私聊"功能正在建设中',
      buttons: [
        {
          text: 'OK',
        },
      ]
    });
    await alert.present();
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
