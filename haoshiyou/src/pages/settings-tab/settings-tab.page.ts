import {AuthService} from "../../services/auth.service";
import {Component} from "@angular/core";
import {Env} from "../../app/env";

@Component({
  templateUrl: 'settings-tab.page.html'
})
export class SettingsTabPage {
  constructor(public auth:AuthService) {

  }
  public version = Env.version;
}
