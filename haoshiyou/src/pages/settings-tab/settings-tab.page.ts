import {AuthService} from "../../services/auth.service";
import {Component, OnInit} from "@angular/core";
import {Env} from "../../app/env";
import {CodePush} from "@ionic-native/code-push";
import {Platform, ToastController} from "ionic-angular";
import {AppVersion} from "@ionic-native/app-version";
declare let window:any;

@Component({
  templateUrl: 'settings-tab.page.html'
})
export class SettingsTabPage implements OnInit {

  public versionEnv:string = Env.version;
  public versionDownloaded:string = null;
  public versionPending:string = null;
  public versionRemote:string = null;
  public versionApp:string = null;
  public debugCounter:number = 0;
  constructor(
      public auth:AuthService,
      private codePush:CodePush,
      private platform:Platform,
      public appVersion:AppVersion,
      private toastCtr:ToastController,
  ) {}

  public async debugIncrementer() {
    this.debugCounter++;
    if (this.debugCounter > 3 && this.debugCounter < 9) {
      let toast = this.toastCtr.create({
        message: `${9 - this.debugCounter} more clicks before debug...`,
        duration: 2000,
        position: 'bottom'
      });
      await toast.present();
    }
  }
  public isDebug() {
    return this.debugCounter > 8;
  }

  public async startSync() {
    this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
    let downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
    this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
    await this.updateVersions();
  }
  public async updateVersions() {

    if (this.platform.is('cordova')) {
      this.versionApp =  (await this.appVersion.getPackageName()) + `(${await this.appVersion.getVersionCode()})`;
      await this.platform.ready();
      let currentPackageInfo = await this.codePush.getCurrentPackage();
      this.versionDownloaded = currentPackageInfo ? currentPackageInfo.appVersion :  `未知`;
      let pendingPackageInfo = await this.codePush.getPendingPackage();
      this.versionPending = pendingPackageInfo ? pendingPackageInfo.appVersion :  `未知`;
      let remotePackageInfo = await this.codePush.checkForUpdate();
      this.versionRemote = remotePackageInfo ? remotePackageInfo.appVersion + remotePackageInfo.downloadUrl :  `未知`;
    }
    else this.versionApp = '未知';
  }
  async ngOnInit() {
    await this.updateVersions();
  }
}
