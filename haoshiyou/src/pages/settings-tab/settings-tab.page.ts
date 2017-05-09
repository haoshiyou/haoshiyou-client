import {AuthService} from "../../services/auth.service";
import {Component, AfterViewInit} from "@angular/core";
import {Env} from "../../app/env";
import {CodePush} from "@ionic-native/code-push";
import {Platform} from "ionic-angular";

@Component({
  templateUrl: 'settings-tab.page.html'
})
export class SettingsTabPage implements AfterViewInit {

  async ngAfterViewInit() {
    await this.platform.ready();
    if (this.platform.is('cordova')) {
      let pInfo = await this.codePush.getCurrentPackage();
      this.version = `CodePush:${pInfo.appVersion}`;
    } else {
      this.version = `Non-Cordova:` + Env.version;
    }
  }

  constructor(
      public auth:AuthService,
      private codePush:CodePush,
      private platform:Platform) {
  }

  public version:string = Env.version;
}
