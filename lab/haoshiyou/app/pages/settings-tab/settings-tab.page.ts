import {Page} from "ionic-angular";
import {AuthService} from "../../services/auth.service.ts";

@Page({
  templateUrl: 'build/pages/settings-tab/settings-tab.page.html'
})
export class SettingsTabPage {
  constructor(private auth:AuthService) {

  }
}
