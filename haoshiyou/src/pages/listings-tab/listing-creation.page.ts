import {Platform, NavParams, NavController, AlertController} from "ionic-angular";
import {OnInit, Inject, Component} from "@angular/core";
import {ListingType, Listing} from "../../models/listing";
import {uuid} from "../../util/uuid";
import {IListingService} from "../../services/listings/listing.service";
import {IUserService} from "../../services/chats/user.service";
import {User} from "../../models/models";
import {NotificationService} from "../../services/notfication.service";

const DEFAULT_LAT:number = 37.41666;
const DEFAULT_LNG:number = -122.09106;
/**
 * A page contains a map view and a list showing the listings.
 */
@Component({
  selector: 'creation-page',
  templateUrl: 'listing-creation.page.html',
})
export class CreationPage implements OnInit {
  //noinspection JSUnusedLocalSymbols, JSMismatchedCollectionQueryUpdate
  private typeOptions:ListingType[] = [ListingType.ROOMMATE_WANTED, ListingType.ROOM_WANTED];
  private listing:Listing;
  private localityText:string;
  //noinspection JSMismatchedCollectionQueryUpdate used in HTML
  private dirty:{[field:string]: boolean} = {};
  constructor(private platform:Platform, private params:NavParams,
              private listingService:IListingService,
              private nav:NavController,
              private alertCtrl:AlertController,
              private userService:IUserService,
              private notificationService:NotificationService) {
    if (params.data.listing) {
      this.listing = params.data.listing;
    } else {
      this.listing = <Listing>{};
      this.listing.id = uuid();
      this.listing.lat = DEFAULT_LAT;
      this.listing.lng = DEFAULT_LNG;
    }
    if (!this.listing.imageIds) this.listing.imageIds = [];
  }

  ngOnInit():any {
    this.platform.ready().then(() => {
    });
  }


  //noinspection JSUnusedLocalSymbols: used in HTML
  private save() {
    if (this.validate()) {
      this.listing.lastUpdated = Date.now();
      this.userService.promiseMe().then((me:User)=> {
        this.listing.ownerId = me.id;
      }).then(()=> {
        return this.listingService.createListing(this.listing);
      }).then(()=> {
        // succeed.
        return this.notificationService.sendTopicMessage(NotificationService.TOPIC_LISTING, this.listing.title);
      }).then(()=> {
        return this.nav.pop();
      });
    } else {
      this.dirty['title'] = true;
      this.dirty['content'] = true;
      this.dirty['type'] = true;
    }
  }

  validate():boolean {
    return (this.listing.title && this.listing.content && (this.listing.type!=null));
  }

  updateImageIds(imageIds:string[]) {
    this.listing.imageIds = imageIds;
  }
  //noinspection JSUnusedLocalSymbols, used in HTML,
  private deleteListing(): void {
    let prompt = this.alertCtrl.create({
      title: '确认删除?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            this.nav.pop(); // alert
          }
        },
        {
          text: '删除',
          handler: () => {
            this.listingService.removeListing(this.listing.id).then(()=>{
              this.nav.pop().then(()=>{
                this.nav.pop();
              }); // alert
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
