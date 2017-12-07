import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
import {FlagService} from "../../services/flag.service";

@Component({
  templateUrl: 'filter-settings.comp.html',
  selector: 'filter-settings',
})
export class FilterSettingsComponent {
  constructor(public viewCtrl: ViewController,
              private flagService: FlagService,) {}
  public options = [
    'All',
    'SanFrancisco',
    'MidPeninsula',
    'SouthBayWest',
    'SouthBayEast',
    'EastBay',
    'ShortTerm',
    'Seattle',
    'TestGroup',
  ];
  public optionsMap =
      {
        'All': '全部',
        'SanFrancisco': '三番',
        'MidPeninsula': '中半岛',
        'SouthBayWest': '南湾西',
        'SouthBayEast': '南湾东',
        'EastBay': '东湾',
        'ShortTerm': '短租',
        'Seattle': '西雅图',
        'TestGroup': '测试',
      };
  close() {
    this.viewCtrl.dismiss();
  }
}