import {OnInit, OnDestroy, Inject} from "@angular/core";
import {Page, NavController, Modal, Platform} from "ionic-angular";
import {ChatsTabPage} from "../chats-tab/chats-tab.page";
import {ListingsTabPage} from "../listings-tab/listings-tab.page.ts";
import {SettingsTabPage} from "../settings-tab/settings-tab.page";
import {Network} from "ionic-native";
import {Logger} from "log4javascript";
import {DisconnectModal} from "./disconnect.modal";
import {Subscription} from "rxjs";
import {loggerToken} from "../../services/log.service";
import {QrCodeTabPage} from "../qrcode-tab/qrcode-tab.page";

@Page({
  templateUrl: 'build/pages/tabs/tabs.html',

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

  constructor(private nav:NavController,
              private platform:Platform,
              @Inject(loggerToken) private logger:Logger) {
  }

  ngOnInit():void {
    // TODO(zzn): add unread message counts
    this.platform.ready().then(()=> {
      if (this.platform.is("ios") || this.platform.is("android")) {
        this.logger.debug(`The platform is ios or android, setting up disconnectModal.`);
        this.disconnectModal = Modal.create(DisconnectModal);

        this.onDisconnect = Network.onDisconnect().subscribe(() => {
          this.logger.debug(`Disconnected, show disconnectModal.`);
          this.nav.present(this.disconnectModal, {animate: true});
        });

        this.onConnect = Network.onConnect().subscribe(() => {
          this.logger.debug(`Connected, show disconnectModal.`);
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