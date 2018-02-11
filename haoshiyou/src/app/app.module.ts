import {HaoshiyouApp} from "./app.component";
import {IonicApp, IonicModule} from "ionic-angular";
import {NgModule} from "@angular/core";
import {Http} from "@angular/http";
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import {FilterSettingsComponent} from "../pages/listings-tab/filter-settings.comp";
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
import {AuthService} from "../services/auth.service";
import {TabsPage} from "../pages/tabs/tabs";
import {EnumMsgPipe} from "../pipes/enum-msg.pipe";
import {ImageIdsToUrlPipe, ImageIdToUrlPipe} from "../pipes/image-id-to-url.pipe";
import {TimeFromNowPipe} from "../pipes/time-from-now.pipe";
import { NativeStorage } from '@ionic-native/native-storage';
import {MapService} from "../services/map.service";
import {CityNZipPipe} from "../pipes/city-n-zip.pipe";
import {QrCodeTabPage} from "../pages/qrcode-tab/qrcode-tab-page";
import {SDKBrowserModule} from "../loopbacksdk/index";
import {HsyGroupEnumMsgPipe} from "../pipes/hsy-group-enum-msg.pipe";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {Transfer} from "@ionic-native/transfer";
import {Network} from "@ionic-native/network";
import {Push} from "@ionic-native/push";
import {CodePush} from "@ionic-native/code-push";
import {AppVersion} from "@ionic-native/app-version";
import {DateFormatterPipe} from "../pipes/date-formatter.pipe";
import {FlagService} from "../services/flag.service";
import {MineTabPage} from "../pages/mine-tab/mine-tab.page";
import { FormsModule }   from '@angular/forms';
import {ListingUxDetailPage} from "../pages/listings-tab/listing-ux-detail.page";
import {ListingsUxTabPage} from "../pages/listings-tab/listings-ux-tab.page";
import {ListingUxItem} from "../pages/listings-tab/listing-ux-item.comp";

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
    FilterSettingsComponent,
    TabsPage,
    ImageGridComponent,
    CreationPage,
    ListingDetailPage,
    ListingUxDetailPage,
    ListingItem,
    ListingsTabPage,
    ListingUxItem,
    ListingsUxTabPage,
    MapViewComponent,
    LongImageComponent,
    RemoveModal,
    SettingsTabPage,
    DisconnectModal,
    QrCodeTabPage,
    MineTabPage,


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
    },  {
      links: [
        {segment: '', component: TabsPage, name: 'TabsPage' },
        {segment: 'listing/:id', component: ListingDetailPage, name: 'ListingDetailPage' },
        {segment: 'listing-ux/:id', component: ListingUxDetailPage, name: 'ListingUxDetailPage' },
        // As of 2016-11-14 per https://github.com/driftyco/ionic/issues/9012,
        // Ionic deeplinker and navigation does not work well with Tab structures.
      ]
    }),
    BrowserModule,
    HttpModule,
    SDKBrowserModule.forRoot(),
    FormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HaoshiyouApp,
    FilterSettingsComponent,
    TabsPage,
    ImageGridComponent,
    CreationPage,
    ListingDetailPage,
    ListingUxDetailPage,
    ListingItem,
    ListingsTabPage,
    ListingUxItem,
    ListingsUxTabPage,
    MapViewComponent,
    LongImageComponent,
    RemoveModal,
    SettingsTabPage,
    DisconnectModal,
    QrCodeTabPage,
    MineTabPage
  ],
  providers: [
    {provide: IImageService, useClass: CloudinaryImageService},
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
