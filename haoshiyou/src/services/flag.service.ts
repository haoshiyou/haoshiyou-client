import {Injectable} from "@angular/core";
declare let JSON;

@Injectable()
export class FlagService {
  private flagMap:Object = {};
  constructor(){
    let url_string = window.location.href;
    var url = new URL(url_string);
    var flagJsonStr = url['searchParams'].get("flags");
    this.flagMap = JSON.parse(flagJsonStr);
  }
  private flags = {
    'debug': false,
    'realCreate': false,
    'requireToContact': false,
    'newUx': true,
  };

  getAllFlags() {
    return this.flags;
  }

  setFlag(flagName:string, value:boolean) {
    this.flags[flagName] = value;
  }

  getFlag(flagName:string):boolean {
    if (this.flagMap && flagName in this.flagMap) {
      return this.flagMap[flagName];
    }
    return this.flags[flagName];
  }
}
