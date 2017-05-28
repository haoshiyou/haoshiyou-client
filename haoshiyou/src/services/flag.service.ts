import {Injectable} from "@angular/core";
declare let JSON;

@Injectable()
export class FlagService {
  private flags = {
    'debug': false,
    'realCreate': false
  };

  getAllFlags() {
    return this.flags;
  }

  setFlag(flagName:string, value:boolean) {
    this.flags[flagName] = value;
  }

  getFlag(flagName:string):boolean {
    return this.flags[flagName];
  }
}
