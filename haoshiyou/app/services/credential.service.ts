// app/services/auth/auth.ts

import {Injectable} from "@angular/core";

// TODO(xinbenlv): Ideally we want to use enum as the credId for retrieving the credentials,
// but using enum or string alias is not yet supported in TS per
// https://github.com/Microsoft/TypeScript/issues/1206 (Duplicates #2491, #5683, 8921)
// We will revisit later once that becomes available.
//

@Injectable()
export class ICredentialService {
  get(credId:string):string {
    throw "Not Implemented";
  }

  setEnv(type:string) {
    throw "Not Implemented";
  }

  getEnv():string {
    throw "Not Implemented";
  }
}

@Injectable()
export class StaticCredentialService {
  private prodCredentials:{[credId:string]:string} = {
    FCM_SENDER_ID: '59094925347', // Same as dev
    FCM_KEY: 'AIzaSyA8IczGUriov_yYY4bnrqKUkL7F4v6i9sc', // Same as dev
    AUTH0_CLIENT_ID: 'gZaIRkEuSAlO1HXs7wWFpmZv5aDNEPSk',
    AUTH0_ACCOUNT_DOMAIN: 'xinbenlv.auth0.com',
    CLOUDINARY_CLOUD_NAME: 'xinbenlv',
    CLOUDINARY_API_KEY: '999284541119412',
    CLOUDINARY_UPLOAD_PRESET: 'haoshiyou-prod',
    FIREBASE_BASE_URL: 'haoshiyou-prod.firebaseio.com',
    GOOGLE_ANALYTICS_PROPERTY_ID: 'UA-55311687-4',
    LOG_SENSE_TOKEN: 'd032d125-1a39-4129-bfb0-4e3e4afc17e9',
  };

  private devCredentials:{[credId:string]:string} = {
    FCM_SENDER_ID: '59094925347',
    FCM_KEY: 'AIzaSyA8IczGUriov_yYY4bnrqKUkL7F4v6i9sc',
    AUTH0_CLIENT_ID: 'StjMTE6NRzI9qmUPT2ij4LvEzmlja8OY',
    AUTH0_ACCOUNT_DOMAIN: 'xinbenlv.auth0.com',
    CLOUDINARY_CLOUD_NAME: 'xinbenlv',
    CLOUDINARY_API_KEY: '999284541119412',
    CLOUDINARY_UPLOAD_PRESET: 'haoshiyou-dev',
    FIREBASE_BASE_URL: 'haoshiyou-dev.firebaseio.com',
    GOOGLE_ANALYTICS_PROPERTY_ID: 'UA-55311687-3',
    LOG_SENSE_TOKEN: '85b11658-5721-4734-a396-cb552d8e5e96',
  };
  private env:string;
  private credentials;

  constructor() {
    this.env = "prod";
    this.credentials = {
      prod: this.prodCredentials,
      dev: this.devCredentials
    };
  }

  get(credId:string):string {
    return this.credentials[this.env][credId];
  }

  setEnv(type:string) {
    this.env = type;
  }

  getEnv():string {
    return this.env;
  }
}
