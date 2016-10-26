import {OnInit, OnDestroy, Inject, Component} from "@angular/core";
import {NavController, Modal, ModalController, Platform} from "ionic-angular";
import {ChatsTabPage} from "../chats-tab/chats-tab.page";
import {ListingsTabPage} from "../listings-tab/listings-tab.page";
import {SettingsTabPage} from "../settings-tab/settings-tab.page";
import {Network} from "ionic-native";
import {DisconnectModal} from "./disconnect.modal";
import {Subscription} from "rxjs";

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

  unreadMessagesCount:number;

  constructor(private nav:NavController,
              private modalCtrl: ModalController,
              private platform:Platform) {
  }

  ngOnInit():void {
    // TODO(zzn): add unread message counts
    this.platform.ready().then(()=> {
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
