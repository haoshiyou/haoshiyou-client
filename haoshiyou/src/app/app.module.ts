import { BrowserModule } from '@angular/platform-browser';
import {HaoshiyouApp} from "./app.component";
import {IonicApp, IonicModule} from "ionic-angular";
import {NgModule} from "@angular/core";
import {Http} from "@angular/http";
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import {ChatMessageComp} from "../pages/chats-tab/chat-message.comp";
import {ChatThreadComp} from "../pages/chats-tab/chat-thread.comp";
import {ChatWindowPage} from "../pages/chats-tab/chat-window.page";
import {ChatsTabPage} from "../pages/chats-tab/chats-tab.page";
import {ImageGridComponent} from "../pages/listings-tab/image-grid.comp";
import {CreationPage} from "../pages/listings-tab/listing-creation.page";
import {ListingDetailPage} from "../pages/listings-tab/listing-detail.page";
import {ListingItem} from "../pages/listings-tab/listing-item.comp";
import {ListingsTabPage} from "../pages/listings-tab/listings-tab.page";
import {MapViewComponent} from "../pages/listings-tab/map-view.comp";
import {RemoveModal} from "../pages/listings-tab/remove.modal";
import {SettingsTabPage} from "../pages/settings-tab/settings-tab.page";
import {DisconnectModal} from "../pages/tabs/disconnect.modal";
import {IImageService, CloudinaryImageService} from "../services/image.service";
import {NotificationService} from "../services/notfication.service";
import {IListingService} from "../services/listings/listing.service";
import {FirebaseListingService} from "../services/listings/fb-listing.service";
import {AuthService} from "../services/auth.service";
import {IUserService, FirebaseUserService} from "../services/chats/user.service";
import {IThreadService, FirebaseThreadService} from "../services/chats/thread.service";
import {IMessageService, FirebaseMessageService} from "../services/chats/message.service";
import {TabsPage} from "../pages/tabs/tabs";
import {EnumMsgPipe} from "../pipes/enum-msg.pipe";
import {ImageIdsToUrlPipe, ImageIdToUrlPipe} from "../pipes/image-id-to-url.pipe";
import {TimeFromNowPipe} from "../pipes/time-from-now.pipe";
import { AngularFireModule } from 'angularfire2';
import { Storage } from '@ionic/storage';
import {MapService} from "../services/map.service";
import {CityNZipPipe} from "../pipes/city-n-zip.pipe";
import {Env} from "../app/env";

const _components:Object[] = [
  HaoshiyouApp,
  TabsPage,
  ChatMessageComp,
  ChatThreadComp,
  ChatWindowPage,
  ChatsTabPage,
  ImageGridComponent,
  CreationPage,
  ListingDetailPage,
  ListingItem,
  ListingsTabPage,
  MapViewComponent,
  RemoveModal,
  SettingsTabPage,
  DisconnectModal,
];

const _pipes:Object[] = [
  EnumMsgPipe,
  ImageIdsToUrlPipe,
  ImageIdToUrlPipe,
  TimeFromNowPipe,
  CityNZipPipe
];
let storage: Storage = new Storage();
export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}


@NgModule({
  declarations: [
    // All Components
    HaoshiyouApp,
    TabsPage,
    ChatMessageComp,
    ChatThreadComp,
    ChatWindowPage,
    ChatsTabPage,
    ImageGridComponent,
    CreationPage,
    ListingDetailPage,
    ListingItem,
    ListingsTabPage,
    MapViewComponent,
    RemoveModal,
    SettingsTabPage,
    DisconnectModal,

    // All Pipes
    EnumMsgPipe,
    ImageIdsToUrlPipe,
    ImageIdToUrlPipe,
    TimeFromNowPipe,
    CityNZipPipe
  ],
  imports: [
    IonicModule.forRoot(HaoshiyouApp),
    BrowserModule,
    AngularFireModule.initializeApp(Env.configFirebase)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HaoshiyouApp,
    TabsPage,
    ChatMessageComp,
    ChatThreadComp,
    ChatWindowPage,
    ChatsTabPage,
    ImageGridComponent,
    CreationPage,
    ListingDetailPage,
    ListingItem,
    ListingsTabPage,
    MapViewComponent,
    RemoveModal,
    SettingsTabPage,
    DisconnectModal,
  ],
  providers: [
    {provide: IUserService, useClass: FirebaseUserService},
    {provide: IThreadService, useClass: FirebaseThreadService},
    {provide: IMessageService, useClass: FirebaseMessageService},
    {provide: IListingService, useClass: FirebaseListingService},
    {provide: IImageService, useClass: CloudinaryImageService},
    NotificationService,
    MapService,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    Storage
  ]
})
export class AppModule {
}
