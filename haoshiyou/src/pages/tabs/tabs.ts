import {OnInit, OnDestroy, Component, AfterViewInit} from "@angular/core";
import {NavController, Modal, ModalController, Platform} from "ionic-angular";
import {ChatsTabPage} from "../chats-tab/chats-tab.page";
import {ListingsTabPage} from "../listings-tab/listings-tab.page";
import {SettingsTabPage} from "../settings-tab/settings-tab.page";
import {Network, Deeplinks} from "ionic-native";
import {DisconnectModal} from "./disconnect.modal";
import {Subscription} from "rxjs";
import {ListingDetailPage} from "../listings-tab/listing-detail.page";
import {QrCodeTabPage} from "../qrcode-tab/qrcode-tab-page";

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit, OnDestroy, AfterViewInit {
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

  ngAfterViewInit() {
    console.log("XXXX trying to set route 1");
    this.platform.ready().then(() => {
      console.log("XXXX trying to set route 2");

      Deeplinks.routeWithNavController(this.navController, {
        'listing/:id': ListingDetailPage
      }, {}, /*success*/(match) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', JSON.stringify(match));
        console.log('Successfully matched route.$route', JSON.stringify(match.$route));
        console.log('Successfully matched route.$args', JSON.stringify(match.$args));
        console.log('Successfully matched route.$link', JSON.stringify(match.$link));
      }, /*error*/(nomatch) => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
      });

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

      console.log("XXXX trying to set route 3");
    });
  }
}
