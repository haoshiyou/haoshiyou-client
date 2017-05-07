import {OnInit, OnDestroy, Component} from "@angular/core";
import {NavController, Modal, ModalController, Platform} from "ionic-angular";
import {ChatsTabPage} from "../chats-tab/chats-tab.page";
import {ListingsTabPage} from "../listings-tab/listings-tab.page";
import {SettingsTabPage} from "../settings-tab/settings-tab.page";
import {Network} from "ionic-native";
import {DisconnectModal} from "./disconnect.modal";
import {Subscription} from "rxjs";
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
  //noinspection JSUnusedGlobalSymbols
  tab1Root:any = ChatsTabPage;
  //noinspection JSUnusedGlobalSymbols
  tab2Root:any = ListingsTabPage;
  //noinspection JSUnusedGlobalSymbols
  tab3Root:any = SettingsTabPage;
  //noinspection JSUnusedGlobalSymbols
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

      // this.shouldShowQrCode = !this.platform.is('cordova');
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

  ngAfterViewInit() {
    this.platform.ready().then(() => {

      // Deeplinks.route({
      //   'listing/:id': ListingDetailPage
      // }).subscribe((match) => {
      //   // match.$route - the route we matched, which is the matched entry from the arguments to route()
      //   // match.$args - the args passed in the link
      //   // match.$link - the full link data
      //   console.log('Successfully matched route', JSON.stringify(match));
      //   console.log('Successfully matched route.$route', JSON.stringify(match.$route));
      //   console.log('Successfully matched route.$args', JSON.stringify(match.$args));
      //   console.log('Successfully matched route.$link', JSON.stringify(match.$link));
      // }, (nomatch) => {
      //   // nomatch.$link - the full link data
      //   console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
      // });
    });
  }
}
