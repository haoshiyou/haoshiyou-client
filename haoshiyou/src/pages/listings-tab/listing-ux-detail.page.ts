import {AlertController, Content, NavController, NavParams} from "ionic-angular";
import {ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {IImageService} from "../../services/image.service";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import {HsyUserApi} from "../../loopbacksdk/services/custom/HsyUser";
import {AuthService} from "../../services/auth.service";
import {FlagService} from "../../services/flag.service";
import {MapViewComponent} from "./map-view.comp";
import {ListingsUxTabPage} from "./listings-ux-tab.page";

declare let window:any;
declare let ga:any;

@Component({
  selector: 'listing-ux-detail',
  templateUrl: 'listing-ux-detail.page.html',
})
export class ListingUxDetailPage {
  private view:MapViewComponent;
  @ViewChild(Content) content: Content;

  @ViewChild('pageContainer') pageContainer;
  @ViewChild('imageContainer') imageContainer;
  @ViewChild('mapViewSingle') set mapView(view:MapViewComponent) {
    this.view = view;
    if (this.view) {
      this.view.clearMarkers();
      this.view.addListings([this.listing]);
      this.view.render();
      this.view.setCenter({lng: this.listing.location_lng, lat: this.listing.location_lat})
    }
  };
  get mapView():MapViewComponent {
    return this.view;
  }
  listing: HsyListing;
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
    this.params.data.id = this.listing.uid;
    this.title = `好室友™帖子：` + this.listing.title;
    this.loading = false;
    this.hackExtractHsyGroupNickAndListing();
    return;
  }

  // This is a HACK, when bot is able to handle this, we can remove this part
  hackExtractHsyGroupNickAndListing() {
    if (!this.listing.hsyGroupNick && /^group-collected-/.test(this.listing.uid)) {
      this.listing.hsyGroupNick = this.listing.uid.substr(16);
    }
  }

  async ngOnInit():Promise<void> {
    await this.loadListing();
  }

  constructor(
      private nav:NavController,
      private params:NavParams,
      private imageService:IImageService,
      private api:HsyListingApi,
      private hsyUserApi:HsyUserApi,
      private auth: AuthService,
      private alertCtrl: AlertController,
      private ref: ChangeDetectorRef,
      private flagService: FlagService,
  ) {}
  async backToMain() {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'listings-tab',
      eventLabel: 'direct-url'
    });
    if (this.nav.length() > 1) {
      await this.nav.pop();
    } else {
      await this.nav.setRoot(ListingsUxTabPage);
      await this.nav.goToRoot({});
    }

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
            this.listing.owner = null; // 防止 owner 和 ownerId 的矛盾
            this.api.upsert<HsyListing>(this.listing, ).take(1).toPromise()
                .then(async (_) => {
                  this.listing = await this.api.findById<HsyListing>(
                      this.listing.uid,
                      {include: ["owner"]}).take(1).toPromise();

                  this.ref.markForCheck();
                })
                .catch(e => {
                  console.warn(`Error in claiming post = 
                      ${JSON.stringify(e, null, ' ')}`);
                });
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

  private isClaimed():boolean {
    return !/^group-collected-/.test(this.listing.ownerId);
  }

  private isMine(): boolean {
    if (this.listing) {
      return window.localStorage['user_id'] === this.listing.ownerId ;
    }
    return false;
  }
  private eligibleToViewContact() {
    return false;
  }

  private isDebug() {
    return this.flagService.getFlag('debug');
  }

  private debugStr() {
    return JSON.stringify(this.listing,null, '  ');
  }

  private hasContactInfo() {
    let listing = this.listing;
    let has:boolean = ((listing.owner && (listing.owner.contactPhone || listing.owner.contactEmail || listing.owner.weixin)
    )|| listing.hsyGroupNick && listing.hsyGroupEnum)!=null;
    if (!has) {
      console.warn(`listing doesn't have contact info`, this.listing);
    }
    return has;
  }

  private scrollToContact() {
    this.content.scrollToBottom();
  }

  private fullscreen(currentIndex) {

    let dom = this.imageContainer;
    let viewer = new window.Viewer(dom.getNativeElement(), {
      url: (image) => {
        let imageId = image.getAttribute('imageid');
        return this.imageService.getUrlFromId(imageId, 0, 0);
      },
      inline: false,
      title: false,
      movable: true,
      rotatable: false,
      backdrop: true,
      toolbar: false,
      zoomable: true,
      fullscreen: true,
      container: this.pageContainer.getNativeElement()
    }, currentIndex);
    viewer.show();
    // viewer.view(currentIndex);
  }
}
