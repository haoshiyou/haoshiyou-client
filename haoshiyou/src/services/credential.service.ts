// app/services/auth/auth.ts
import {Injectable} from "@angular/core";

declare let $; // jQuery

// TODO(xinbenlv): Ideally we want to use enum as the credId for retrieving the credentials,
// but using enum or string alias is not yet supported in TS per
// https://github.com/Microsoft/TypeScript/issues/1206 (Duplicates #2491, #5683, 8921)
// We will revisit later once that becomes available.
//

@Injectable()
export class ICredentialService {
  getCred(credId:string):string {
    throw "Not Implemented";
  }

  getFlag(flagId:string):any {
    throw "Not Implemented";
  }

  getEnv():string {
    throw "Not Implemented";
  }

  getVersion():string {
    throw "Not Implemented";
  }
}

@Injectable()
export class JsonCredentialService {
  private credentials:{[credId:string]:string};
  private env:string;
  private flags:{[flagId:string]:any};
  private version:string;
  private CONFIG_URL:string = "config/config.json";
  constructor() {
    this.getConfigSync();
  }

  /**
   * Sync get Config
   */
  private getConfigSync() {
    //noinspection TypeScriptValidateJSTypes, jQuery TypeDefinition is not yet very good.
    $.ajax({
      dataType: "json",
      url: this.CONFIG_URL,
      success: (data) => {
        this.credentials = data.cred;
        this.env = data.env;
        this.version = data.version;
        this.flags = data.flags;
        console.log("Successfully load config.");
        console.log(`Version = ${this.version}`);
      },
      error: (error) => {
        console.error(error);
      },
      async: false
    });
  }

  getCred(credId:string):string {
    return this.credentials[credId];
  }

  getFlag(flagId:string):any {
    return this.flags[flagId];
  }

  getEnv():string {
    return this.env;
  }

  getVersion():string {
    return this.version;
  }
}
