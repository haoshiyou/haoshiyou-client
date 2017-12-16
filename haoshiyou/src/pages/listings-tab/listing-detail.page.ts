import {NavParams, NavController, AlertController} from "ionic-angular";
import {IThreadService} from "../../services/chats/thread.service";
import {Thread, User} from "../../models/models";
import {IUserService} from "../../services/chats/user.service";
import {ChatWindowPage} from "../chats-tab/chat-window.page";
import {Component, AfterViewInit, ChangeDetectionStrategy} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {IImageService} from "../../services/image.service";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import {HsyUserApi} from "../../loopbacksdk/services/custom/HsyUser";
import {HsyUser} from "../../loopbacksdk/models/HsyUser";
import {ListingsTabPage} from "./listings-tab.page";
import {AuthService} from "../../services/auth.service";
import { ChangeDetectorRef } from '@angular/core';
import {FlagService} from "../../services/flag.service";
declare let window:any;
declare let QRCode:any;
declare let ga:any;

@Component({
  selector: 'listing-detail',
  templateUrl: 'listing-detail.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush ,
})
export class ListingDetailPage {
  listing: HsyListing;
  title: string;
  public loading: boolean = true;
  public useGrid:boolean = !(navigator.platform == 'iPhone');
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
      this.listing = await this.params.data.listing;
      this.ref.markForCheck();
    } else {
      let id = this.params.data.id;
      this.listing = await this.api.findById(id, {
        include: ['interactions', 'owner'],
      })
          .take(1)
          .toPromise() as HsyListing;
      this.ref.markForCheck();
    }
    console.log(`XXX listing = ${JSON.stringify(this.listing, null, '  ')}`);
    this.params.data.id = this.listing.uid;
    this.title = `好室友™帖子：` + this.listing.title;
    this.loading = false;
    return;
  }

  async ngOnInit():Promise<void> {
    await this.loadListing();
  }

  constructor(private threadService:IThreadService,
              private userService:IUserService,
              private nav:NavController,
              private params:NavParams,
              private imageService:IImageService,
              private api:HsyListingApi,
              private hsyUserApi:HsyUserApi,
              private auth: AuthService,
              private alertCtrl: AlertController,
              private ref: ChangeDetectorRef,
              private flagService: FlagService
              ) {}
  async backToMain() {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'listings-tab',
      eventLabel: 'direct-url'
    });
    await this.nav.push(ListingsTabPage);
  }
  ionViewDidEnter() {
    console.log(`Entering lising detail page`);
    this.ref.markForCheck();
  }
  async edit() {
    await this.nav.push(CreationPage, {listing: this.listing});
  }
  async claimAndEdit() {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'claim-and-edit',
    });
    if (!this.auth.authenticated()) {
      let alert = this.alertCtrl.create({
        title: '请登录后认领',
        buttons: [
          {
            text: '取消',
          },
          {
            text: '登陆',
            handler: () => {
              this.auth.login();
            }
          }
        ]
      });
      await alert.present();
    } else {
      // Start claiming!
      await this.claim();
    }
  }

  async claim():Promise<boolean> {
    let alert = this.alertCtrl.create({
      title: `请确认认领本帖`,
      subTitle: `标题：${this.listing.title}`,
      buttons: [
        {
          text: '取消',
        },
        {
          text: '确认',
          handler: () => {
            let local = window.localStorage;
            let meId = local['user_id']; // TODO(xinbenlv): use UserService
            this.listing.ownerId = meId;
            this.api.upsert<HsyListing>(this.listing).take(1).toPromise()
                .then(l => {
                  this.listing = l;
                  this.ref.markForCheck();
                })
                .catch(e => {
                  console.warn(`Error in claiming post = 
                  ${JSON.stringify(e, null, ' ')}`)});
            return true;
          }
        }
      ]
    });
    let ret = await alert.present();
    return ret;
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

  private isClaimed():boolean {
    return !/^group-collected-/.test(this.listing.ownerId);
  }

  private isMine(): boolean {
    if (this.listing) {
      console.log(`calls isMine`);
      return window.localStorage['user_id'] === this.listing.ownerId ;
    }
    return false;
  }
  private eligibleToViewContact() {
    return false;
  }
}
