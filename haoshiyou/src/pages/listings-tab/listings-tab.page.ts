import {Platform, NavController, AlertController} from "ionic-angular";
import {IListingService} from "../../services/listings/listing.service";
import {Listing,ListingType} from "../../models/listing";
import {OnInit, OnDestroy, Component} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../services/auth.service";
import {AngularFire} from "angularfire2/index";
import 'rxjs/Rx'; // used by Observable.take()
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
  listingsRoomWanted:Listing[] = [];
  listingsRoommateWanted:Listing[] = [];
  private listingObservable: Observable<Listing[]>;
  private mapReady:boolean = false;
  public mapToggleOn:boolean = false;
  constructor(private platform:Platform,
              private listingService:IListingService,
              private nav:NavController,
              private alertCtrl: AlertController,
              private auth:AuthService,
              private af:AngularFire) {
  }

  ngOnInit() {
    let initMap:Promise<any> = this.platform.ready().then(() => {
    }).then(()=>{
      this.mapReady = true;
      this.updateMarkers();
    });

    this.listingObservable = this.listingService.observableListings();
    this.listingObservable.subscribe((listings:Listing[]) => {
      /* TODO(xinbenlv): currently get all, need to narrow down. */
      this.listings = listings.reverse();
      this.updateMarkers();
    });
    (this.af.database.list("/listings", {
      query: {
        orderByChild: 'type',
        equalTo: 0 // ListingType.ROOMMATE_WANTED
      }
    }).take(1).toPromise() as Promise<Listing[]>).then((l) => {
      this.listingsRoommateWanted = l;
    });

    (this.af.database.list("/listings", {
      query: {
        orderByChild: 'type',
        equalTo: 1 //ListingType.ROOM_WANTED
      }
    }).take(1).toPromise() as Promise<Listing[]>).then((l) => {
      this.listingsRoomWanted = l;
    });
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
