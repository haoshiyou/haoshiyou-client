import {AuthService} from "../../services/auth.service";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'settings-tab.page.html'
})
export class SettingsTabPage {
  constructor(public auth:AuthService) {

  }
}
