import {Platform, NavController, AlertController} from "ionic-angular";
import {IListingService} from "../../services/listings/listing.service";
import {Listing} from "../../models/listing";
import {OnInit, OnDestroy, Component} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {ListingDetailPage} from "./listing-detail.page";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../services/auth.service";
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

  private map:any; // Actually google.maps.Map;
  private markers:any[]; // Actually google.maps.Marker[];
  listings:Listing[];
  private listingObservable: Observable<Listing[]>;
  private mapReady:boolean = false;
  public mapToggleOn:boolean = false;
  constructor(private platform:Platform,
              private listingService:IListingService,
              private nav:NavController,
              private alertCtrl: AlertController,
              private auth:AuthService) {
  }

  ngOnInit() {
    // ChatFakeDataLoader.init(this.messagesService, this.threadsService, this.userService);
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
        buttons: ['好的']
      });
      alert.present();
    }
  }
}
