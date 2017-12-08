import {Component} from "@angular/core";
import {NavParams, Button, Checkbox, ViewController} from "ionic-angular";
import {FlagService} from "../../services/flag.service";
import {FilterSettings} from "../../models/models";

@Component({
  templateUrl: 'filter-settings.comp.html',
  selector: 'filter-settings',
})
export class FilterSettingsComponent {

  private filterSettings = {};
  checkedZhaozu: boolean;
  checkedQiuzu: boolean;

  constructor(public viewCtrl: ViewController,
              private flagService: FlagService,
              private _navParams: NavParams) {
    if (this._navParams.data) {
      console.log(" --- " + this._navParams.data);
      //TODO: get filterSettings and initial UI
    }
  }

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

  public optionsMap = {
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

  private applyFilterSettings() {
    this.filterSettings['listingType_zhao'] = this.checkedZhaozu ? true: false;
    this.filterSettings['listingType_qiu']  = this.checkedQiuzu  ? true : false;

    this.close();
  }

  close() {
    this.viewCtrl.dismiss({ filterSettings: this.filterSettings });
  }
}