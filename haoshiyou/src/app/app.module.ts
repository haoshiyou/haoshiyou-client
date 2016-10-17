import {HaoshiyouApp} from './app.component';
import {Platform, ionicBootstrap, IonicApp, IonicModule} from "ionic-angular";
import {provide, Inject, Component, NgModule} from "@angular/core";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {FIREBASE_PROVIDERS, AngularFire, FirebaseUrl} from "angularfire2";
import {Logger} from "log4javascript/log4javascript";
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
import {ICredentialService, JsonCredentialService} from "../services/credential.service";
import {IImageService, CloudinaryImageService} from "../services/image.service";
import {NotificationService} from "../services/notfication.service";
import {IListingService} from "../services/listings/listing.service";
import {FirebaseListingService} from "../services/listings/fb-listing.service";
import {LogService, loggerToken} from "../services/log.service";
import {MapService} from "../services/map.service";
import {AuthService} from "../services/auth.service";
import {IUserService, FirebaseUserService} from "../services/chats/user.service";
import {IThreadService, FirebaseThreadService} from "../services/chats/thread.service";
import {IMessageService, FirebaseMessageService} from "../services/chats/message.service";
import {TabsPage} from "../pages/tabs/tabs";
import {CityNZipPipe} from "../pipes/city-n-zip.pipe";
import {EnumMsgPipe} from "../pipes/enum-msg.pipe";
import {ImageIdsToUrlPipe} from "../pipes/image-id-to-url.pipe";
import {TimeFromNowPipe} from "../pipes/time-from-now.pipe";

const _components = [
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

const _pipes = [
  CityNZipPipe,
  EnumMsgPipe,
  ImageIdsToUrlPipe,
  TimeFromNowPipe,
];

@NgModule({
  declarations: [

  ] + _components + _pipes,
  imports: [
    IonicModule.forRoot(HaoshiyouApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HaoshiyouApp,
    TabsPage
  ],
  providers: [
    provide(ICredentialService, {useClass: JsonCredentialService}),
    provide(FirebaseUrl, {
      useFactory: (credService:ICredentialService) => {
        return credService.getCred('FIREBASE_BASE_URL');
      }, deps: [ICredentialService]
    }),
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig(), http);
      },
      deps: [Http]
    }),
    AuthService,
    provide(IUserService, {useClass: FirebaseUserService}),
    provide(IThreadService, {useClass: FirebaseThreadService}),
    provide(IMessageService, {useClass: FirebaseMessageService}),
    provide(IListingService, {useClass: FirebaseListingService}),
    provide(IImageService, {useClass: CloudinaryImageService}),
    NotificationService,
    LogService,
    provide(loggerToken, {
      useFactory: (logService:LogService) => {
        return logService.getLogger();
      }, deps: [LogService]
    }),
    MapService,
    FIREBASE_PROVIDERS,
    HTTP_PROVIDERS
  ]
})
export class AppModule {}
