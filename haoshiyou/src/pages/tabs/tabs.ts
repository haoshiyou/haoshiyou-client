import {OnInit, OnDestroy, Component} from "@angular/core";
import {NavController, Modal, ModalController, Platform} from "ionic-angular";
import {ChatsTabPage} from "../chats-tab/chats-tab.page";
import {ListingsTabPage} from "../listings-tab/listings-tab.page";
import {SettingsTabPage} from "../settings-tab/settings-tab.page";
import {Network} from "ionic-native";
import {DisconnectModal} from "./disconnect.modal";
import {Subscription} from "rxjs";
import {ListingDetailPage} from "../listings-tab/listing-detail.page";
import {QrCodeTabPage} from "../qrcode-tab/qrcode-tab-page";

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit, OnDestroy {
  private onDisconnect:Subscription;
  private onConnect:Subscription;
  private disconnectModal:Modal;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root:any = ChatsTabPage;
  tab2Root:any = ListingsTabPage;
  tab3Root:any = SettingsTabPage;
  tab4Root:any = QrCodeTabPage;
  unreadMessagesCount:number;
  public shouldShowQrCode:boolean = true;
  constructor(private nav:NavController,
              private modalCtrl: ModalController,
              private platform:Platform,
              private navController: NavController) {
  }

  ngOnInit():void {
    // TODO(zzn): add unread message counts

    this.platform.ready().then(()=> {

      this.shouldShowQrCode = !this.platform.is('cordova');
      console.log(`XXX this.platform.is('cordova') = ${this.platform.is('cordova')}`);
      console.log(`XXX this.shouldShowQrCode = ${this.shouldShowQrCode}`);
      if (this.platform.is("ios") || this.platform.is("android")) {
        this.disconnectModal = this.modalCtrl.create(DisconnectModal);

        this.onDisconnect = Network.onDisconnect().subscribe(() => {
          this.disconnectModal.present();
        });

        this.onConnect = Network.onConnect().subscribe(() => {
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
