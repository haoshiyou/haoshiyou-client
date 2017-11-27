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
import {LongImageComponent} from "../pages/listings-tab/long-image.comp";
import {RemoveModal} from "../pages/listings-tab/remove.modal";
import {SettingsTabPage} from "../pages/settings-tab/settings-tab.page";
import {DisconnectModal} from "../pages/tabs/disconnect.modal";
import {IImageService, CloudinaryImageService} from "../services/image.service";
import {NotificationService} from "../services/notfication.service";
import {AuthService} from "../services/auth.service";
import {IUserService, FirebaseUserService} from "../services/chats/user.service";
import {IThreadService, FirebaseThreadService} from "../services/chats/thread.service";
import {IMessageService, FirebaseMessageService} from "../services/chats/message.service";
import {TabsPage} from "../pages/tabs/tabs";
import {EnumMsgPipe} from "../pipes/enum-msg.pipe";
import {ImageIdsToUrlPipe, ImageIdToUrlPipe} from "../pipes/image-id-to-url.pipe";
import {TimeFromNowPipe} from "../pipes/time-from-now.pipe";
import { AngularFireModule } from 'angularfire2';
import { NativeStorage } from '@ionic-native/native-storage';
import {MapService} from "../services/map.service";
import {CityNZipPipe} from "../pipes/city-n-zip.pipe";
import {Env} from "./env";
import {QrCodeTabPage} from "../pages/qrcode-tab/qrcode-tab-page";
import {SDKBrowserModule} from "../loopbacksdk/index";
import {HsyGroupEnumMsgPipe} from "../pipes/hsy-group-enum-msg.pipe";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {AngularFireDatabaseModule} from "angularfire2/database/database.module";
import {AngularFireAuthModule} from "angularfire2/auth/auth.module";
import {Transfer} from "@ionic-native/transfer";
import {Network} from "@ionic-native/network";
import {Push} from "@ionic-native/push";
import {CodePush} from "@ionic-native/code-push";
import {AppVersion} from "@ionic-native/app-version";
import {DateFormatterPipe} from "../pipes/date-formatter.pipe";
import {FlagService} from "../services/flag.service";

export function getAuthHttp(http, nativeStorage:NativeStorage) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => nativeStorage.getItem('id_token'))
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
    LongImageComponent,
    RemoveModal,
    SettingsTabPage,
    DisconnectModal,
    QrCodeTabPage,

    // All Pipes
    EnumMsgPipe,
    HsyGroupEnumMsgPipe,
    ImageIdsToUrlPipe,
    ImageIdToUrlPipe,
    TimeFromNowPipe,
    CityNZipPipe,
    DateFormatterPipe,
  ],
  imports: [
    IonicModule.forRoot(HaoshiyouApp, {
      mode: 'ios'
    }, {
      links: [
        {segment: 'tabs', component: TabsPage, name: 'TabsPage' },
        {segment: 'listing/:id', component: ListingDetailPage, name: 'ListingDetailPage' },
        // As of 2016-11-14 per https://github.com/driftyco/ionic/issues/9012,
        // Ionic deeplinker and navigation does not work well with Tab structures.
      ]
    }),
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(Env.configFirebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SDKBrowserModule.forRoot(),
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
    LongImageComponent,
    RemoveModal,
    SettingsTabPage,
    DisconnectModal,
    QrCodeTabPage
  ],
  providers: [
    {provide: IUserService, useClass: FirebaseUserService},
    {provide: IThreadService, useClass: FirebaseThreadService},
    {provide: IMessageService, useClass: FirebaseMessageService},
    {provide: IImageService, useClass: CloudinaryImageService},
    NotificationService,
    MapService,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, NativeStorage]
    },
    NativeStorage,
    Transfer,
    Network,
    Push,
    CodePush,
    AppVersion,
    FlagService
  ]
})
export class AppModule {
}
