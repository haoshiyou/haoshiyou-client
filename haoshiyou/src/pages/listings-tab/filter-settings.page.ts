import {Component} from "@angular/core";
import {
  NavParams, Button, Checkbox, ViewController, PickerController, PickerOptions,
  PickerColumn, NavController
} from "ionic-angular";
import {FlagService} from "../../services/flag.service";


@Component({
  templateUrl: 'filter-settings.page.html',
  selector: 'filter-settings',
})
export class FilterSettingsPage {
  public filterSettings = null;
  private picker;
  private callback;
  constructor(public viewCtrl: ViewController,
              private flagService: FlagService,
              private pickerCtrl: PickerController,
              private navParams: NavParams,
              private nav: NavController) {
    if (this.navParams.data) {
      this.filterSettings = this.navParams.data['filterSettings'];
      this.callback = this.navParams.data['callback'];
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

  public durationList = [
      '最近3天',
      '最近7天',
      '最近30天',
      '最近90天',
      '不限'
  ];

  close() {
    this.callback(this.filterSettings);
    this.viewCtrl.dismiss();
  }

  private pickPostTime() {
    // Add a cancel and done button by default to the picker
    let pickerOptions:PickerOptions = {};

    const defaultButtons = [{
      text: 'Cancel',
      role: 'cancel',
      handler: () => this.picker.dismiss()
    }, {
      text: 'Done',
      handler: (data: any) => {
        this.filterSettings['duration'] = data.selection.value;
        return data;
      }
    }];
    pickerOptions.buttons = defaultButtons;
    let columnKey = 'selection';
    let values = [0, 1, 7, 30, 60, 90];
    let defaultColumn: PickerColumn = {
      name: columnKey,
      selectedIndex: 0,
      options: values.map(val => {
        return {
          value: val,
          text: this.getPostDateFilterText(val),
        };
      })
    };
    pickerOptions.buttons = defaultButtons;
    pickerOptions.columns = [defaultColumn];
    this.picker = this.pickerCtrl.create(pickerOptions);
    this.picker.present(pickerOptions);
  }

  private getPostDateFilterText(val) {
    return  (val == 0) ? '所有时间' : '最近' + val + '天';
  }
}