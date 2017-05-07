import {Platform, NavController, AlertController} from "ionic-angular";
import {OnInit, OnDestroy, Component} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {AuthService} from "../../services/auth.service";
import "rxjs/Rx";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
/**
 * A page contains a map view and a list showing the listings.
 */
@Component({
  selector: 'listing-tab',
  templateUrl: 'listings-tab.page.html',
})
export class ListingsTabPage implements OnInit, OnDestroy {
  ngOnDestroy(): any {
    for (let marker of this.markers) {
      marker.setMap(null);
    }
  }

  public segmentModel: string = 'ROOMMATE_WANTED'; // by default for rent
  public areaModel: string = 'SouthBayWest'; // by default for 南湾西
  public isLoading: boolean = true;
  private map: any; // Actually google.maps.Map;
  private markers: any[]; // Actually google.maps.Marker[];
  loadedListings: HsyListing[] = [];
  private mapReady: boolean = false;
  public mapToggleOn: boolean = false;

  constructor(private platform: Platform,
              private nav: NavController,
              private alertCtrl: AlertController,
              private auth: AuthService,
              private api: HsyListingApi) {
  }

  async ngOnInit() {
    await this.listReload();
  }

  //noinspection JSUnusedGlobalSymbols
  onSegmentModelChange(newValue):void {
    this.segmentModel = newValue;
    this.listReload(); // no wait
  }

  //noinspection JSUnusedGlobalSymbols
  onAreaModelChange(newValue):void {
    this.areaModel = newValue;
    this.listReload(); // no wait
  }

  async listReload() {
    this.isLoading = true;
    let whereClause = {
      'type': this.segmentModel == 'ROOM_WANTED' ? 1 : 0,
    };

    if (this.areaModel !== 'All') {
      whereClause['hsyGroupEnum'] = this.areaModel;
    }

    this.loadedListings = await this.api
        .find<HsyListing>({
          // TODO(zzn): use ListTypeEnum when migrated
          where: whereClause,
          order: 'lastUpdated DESC',
          limit: 50
        })
        .take(1)
        .toPromise();
    this.isLoading = false;
  }

  private updateMarkers() {
    // TODO(xinbenlv): update markers
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
