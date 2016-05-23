import {Page} from 'ionic-angular';
import {AuthService} from '../../auth.service';

@Page({
  templateUrl: 'build/pages/settings-tab/settings-tab.html'
})
export class SettingsTabPage {
  constructor(private auth: AuthService) {

  }
}
