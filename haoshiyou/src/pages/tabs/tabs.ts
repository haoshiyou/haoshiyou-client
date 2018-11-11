import {OnInit, OnDestroy, Component} from "@angular/core";
import {NavController, Modal, ModalController, Platform} from "ionic-angular";
import {SettingsTabPage} from "../settings-tab/settings-tab.page";
import {Network} from "@ionic-native/network";
import {DisconnectModal} from "./disconnect.modal";
import {Subscription} from "rxjs";
import {QrCodeTabPage} from "../qrcode-tab/qrcode-tab-page";
import {MineTabPage} from "../mine-tab/mine-tab.page";
import {AuthService} from "../../services/auth.service";
import {FlagService} from "../../services/flag.service";
import {ListingsUxTabPage} from "../listings-tab/listings-ux-tab.page";

@Component({
  selector: 'main-tab-nav',
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit, OnDestroy {
  private onDisconnect:Subscription;
  private onConnect:Subscription;
  private disconnectModal:Modal;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  //noinspection JSUnusedGlobalSymbols
  tab2Root:any = ListingsUxTabPage;
  //noinspection JSUnusedGlobalSymbols
  tab3Root:any = SettingsTabPage;
  //noinspection JSUnusedGlobalSymbols
  tab4Root:any = QrCodeTabPage;
  //noinspection JSUnusedGlobalSymbols
  tab5Root:any = MineTabPage;
  unreadMessagesCount:number;
  public shouldShowQrCode:boolean = true;
  constructor(private nav:NavController,
              private modalCtrl: ModalController,
              private platform:Platform,
              private navController: NavController,
              private network: Network,
              private auth:AuthService,
              private flagService: FlagService) {
  }

  ngOnInit():void {
    // TODO(zzn): add unread message counts

    this.platform.ready().then(()=> {

      // this.shouldShowQrCode = !this.platform.is('cordova');
      if (this.platform.is("ios") || this.platform.is("android")) {
        this.disconnectModal = this.modalCtrl.create(DisconnectModal);

        this.onDisconnect = this.network.onDisconnect().subscribe(() => {
          this.disconnectModal.present();
        });

        this.onConnect = this.network.onConnect().subscribe(() => {
          this.disconnectModal.dismiss();
        });
      }

    });
  }

  ngOnDestroy():void {
    if (this.onDisconnect) this.onDisconnect.unsubscribe();
    if (this.onConnect) this.onConnect.unsubscribe();
  }
}
