import {AuthService} from "../../services/auth.service";
import {Component, OnInit} from "@angular/core";
import {Env} from "../../app/env";
import {CodePush} from "@ionic-native/code-push";
import {Platform} from "ionic-angular";
declare let window:any;

@Component({
  templateUrl: 'settings-tab.page.html'
})
export class SettingsTabPage implements OnInit {

  public versionApp:string = Env.version;
  public versionDownloaded:string = null;
  public versionPending:string = null;
  public versionRemote:string = null;

  constructor(
      public auth:AuthService,
      private codePush:CodePush,
      private platform:Platform) {
  }

  public async startSync() {
    this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
    let downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
    this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
    await this.updateVersions();
  }
  public async updateVersions() {
    if (this.platform.is('cordova')) {
      await this.platform.ready();
      let currentPackageInfo = await this.codePush.getCurrentPackage();
      this.versionDownloaded = currentPackageInfo ? currentPackageInfo.appVersion :  `未知`;
      let pendingPackageInfo = await this.codePush.getPendingPackage();
      this.versionPending = pendingPackageInfo ? pendingPackageInfo.appVersion :  `未知`;
      let remotePackageInfo = await this.codePush.checkForUpdate();
      this.versionRemote = remotePackageInfo ? remotePackageInfo.appVersion + remotePackageInfo.downloadUrl :  `未知`;
    }
  }
  async ngOnInit() {
    await this.updateVersions();
  }
}
