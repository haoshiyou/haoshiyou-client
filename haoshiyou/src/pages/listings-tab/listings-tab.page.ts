import {Platform, NavController, AlertController} from "ionic-angular";
import {IListingService} from "../../services/listings/listing.service";
import {Listing,ListingType} from "../../models/listing";
import {OnInit, OnDestroy, Component} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../services/auth.service";
import {AngularFire} from "angularfire2/index";
import 'rxjs/Rx';
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import {GeoPoint} from "../../loopbacksdk/models/BaseModels";
import {LoopBackFilter} from "../../loopbacksdk/models/BaseModels"; // used by Observable.take()
/**
 * A page contains a map view and a list showing the listings.
 */
@Component({
  selector: 'listing-tab',
  templateUrl: 'listings-tab.page.html',
})
export class ListingsTabPage implements OnInit, OnDestroy {
  ngOnDestroy():any {
    for (let marker of this.markers) {
      marker.setMap(null);
    }
  }
  public segmentModel:string = 'ROOMMATE_WANTED'; // by default for rent
  private map:any; // Actually google.maps.Map;
  private markers:any[]; // Actually google.maps.Marker[];
  listings:Listing[];
  listingsRoomWanted:HsyListing[] = [];
  listingsRoommateWanted:HsyListing[] = [];
  private listingObservable: Observable<Listing[]>;
  private mapReady:boolean = false;
  public mapToggleOn:boolean = false;
  constructor(private platform:Platform,
              private listingService:IListingService,
              private nav:NavController,
              private alertCtrl: AlertController,
              private auth:AuthService,
              private af:AngularFire,
              private api:HsyListingApi) {
  }

  async ngOnInit() {
    let initMap:Promise<any> = this.platform.ready().then(() => {
    }).then(()=>{
      this.mapReady = true;
      this.updateMarkers();
    });
    let l = await this.api
        .find<HsyListing>({ order: 'lastUpdated DESC' })
        .take(1)
        .toPromise();

    this.listingsRoommateWanted = l;
    this.listingsRoomWanted = l;
  }

  private updateMarkers() {
    if(this.mapReady && this.listings) {

    }
  }

  gotoCreationPage() {
    if (this.auth.authenticated()) {
      //push another page onto the history stack
      //causing the nav controller to animate the new page in
      this.nav.push(CreationPage);
    } else {
      let alert = this.alertCtrl.create({
        title: '请登录后发帖',
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
      alert.present();
    }
  }
}
