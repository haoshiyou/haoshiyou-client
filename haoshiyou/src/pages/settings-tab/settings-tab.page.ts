import {Page} from "ionic-angular";
import {AuthService} from "../../services/auth.service.ts";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'build/pages/settings-tab/settings-tab.page.html'
})
export class SettingsTabPage {
  constructor(private auth:AuthService) {

  }
}
