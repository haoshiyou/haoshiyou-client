import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyInteractionApi} from "../../loopbacksdk/services/custom/HsyInteraction";
import {HsyInteraction} from "../../loopbacksdk/models/HsyInteraction";
import {uuid} from "../../util/uuid";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import {ListingUxDetailPage} from "./listing-ux-detail.page";
import {FlagService} from "../../services/flag.service";
declare let ga:any;



@Component({
  selector: 'listing-ux-item',
  templateUrl: 'listing-ux-item.comp.html',
})
export class ListingUxItem {
  @Output() onBump = new EventEmitter<HsyListing>();
  @Input() badgeText;
  @Input() listing:HsyListing;
  @Input() indexFromParent:number = 0;

  private placeholderIds = [
    'qfhndxx',
    'ccygytp',
    'yzsmdhz'
  ];
  constructor(private nav:NavController,
              private alertCtrl: AlertController,
              private hsyInteractionApi:HsyInteractionApi,
              private hsyListingApi:HsyListingApi,
              private flagService:FlagService) {
  }


  gotoDetail() {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'listing-detail',
      eventLabel: 'from-listing-item'
    });
    this.nav.push(ListingUxDetailPage, {listing: this.listing});
  }

  async bump() {
    ga('send', 'event', {
      eventCategory: 'interaction',
      eventAction: 'bump',
    });
    let local = window.localStorage;
    let meId = local['user_id']; // TODO(xinbenlv): use UserService
    let now = new Date();
    let hsyInteraction = <HsyInteraction>{
      uid: uuid(),
      userId: meId,
      type: "BUMP",
      listingId: this.listing.uid,
      interactionTime: now
    };
    this.listing.interactions.push(hsyInteraction);
    this.onBump.emit(this.listing);
    await this.hsyInteractionApi.create(hsyInteraction).toPromise();
    await this.hsyListingApi.updateAttributes(this.listing.uid, {latestUpdatedOrBump: now}).toPromise();
  }

  /**
   * regenerate title
   */
  private getReTitle(): string{
    return this.isGoodTitle() ? this.listing.title : this.genReTitle();
  }

  /**
   * good title should contain following information
   * 1: 出租、求租
   * 2: 地点
   * 3: 房间
   * 4: available date
   */
  private isGoodTitle(): boolean{
    let targets = ["出租","招租","求租","转租","合租","长租","短租","找室友","招室友"];
    let includeTarget = this.includesValue(this.listing.title, targets);
    let cities = ["san","santa","francisco","berkeley","oakland","mateo","palo alto","daly","forster","redwood","menlo park","stanford","mountain view","sunnyvale","cupertino","jose","santa clara","campbell","milpitas","fremont","newark","union","hayward","东湾","南湾","三番","旧金山","区","半岛"];
    let includeLocation = this.includesValue(this.listing.title.toLowerCase(), cities);
    let rooms = ["主卧","次卧","单房","两房","1B1B","2B1B","2B2B","4B","3B","2B","1B","猫","狗"];
    let includeRoom = this.includesValue(this.listing.title, rooms);
    return includeTarget && includeLocation && includeRoom;
  }

  /**
   * simply helper function to match any available values in content
   */
  private includesValue(content:string, values:Array<any>): boolean{
    for (let i = 0; i < values.length; i++) {
      if (content.includes(values[i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * generate reTitle by: [出租] 1b1b @ Sunnyvale, 8月起
   */
  private genReTitle(): string{
    let targets = ["出租","招租","求租","转租","合租","长租","短租","找室友","招室友"];
    let rooms = ["主卧","次卧","单房","两房","1B1B","2B1B","2B2B","4B","3B","2B","1B","猫","狗"];
    return "[" + this.getValue(this.listing.content, targets, "信息") + "]"
        + " " + this.getValue(this.listing.content, rooms, "有一房间")
        + " @ " + (this.listing.addressCity ? this.listing.addressCity.charAt(0).toUpperCase() + this.listing.addressCity.slice(1) : "湾区")
        + (this.listing.addressZipcode ? ", " + this.listing.addressZipcode : "");
  }

  /**
   * retrieve any matched values in content
   */
  private getValue(content:string, values:Array<any>, defaultValue:string): string{
    for (let i = 0; i < values.length; i++) {
      if (content.includes(values[i])) {
        return values[i];
      }
    }
    return defaultValue;
  }
}
