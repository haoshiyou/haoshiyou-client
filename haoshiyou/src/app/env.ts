import {
  BaseEnv, ConfigFirebase, ConfigAuth0, ConfigCloudinary,
  ConfigFirebaseCloudMessage, ConfigGoogleAnalytics, ConfigLogSense, EnvType
} from "./base-env";
export class Env implements BaseEnv {
  static version = "3.6";
  static envType:EnvType = EnvType.Dev;
  static flags = {};
  static configFirebase:ConfigFirebase = {
    apiKey: "AIzaSyA7lIOs489rVGzUhlRsCYlWklZGOYjtJik",
    authDomain: "haoshiyou-prod.firebaseapp.com",
    databaseURL: "https://haoshiyou-prod.firebaseio.com",
    storageBucket: "haoshiyou-prod.appspot.com",
    messagingSenderId: "444185275002"
  };
  static configAuth0:ConfigAuth0 = {
    clientId: 'gZaIRkEuSAlO1HXs7wWFpmZv5aDNEPSk',
    accountDomain: 'xinbenlv.auth0.com',
  };
  static configCloudinary:ConfigCloudinary = {
    cloudName: 'xinbenlv',
    apiKey: '999284541119412',
    uploadPreset: 'haoshiyou-prod',
  };
  static configFirebaseCloudMessage:ConfigFirebaseCloudMessage = {
    senderId: '59094925347',
    key: 'AIzaSyA8IczGUriov_yYY4bnrqKUkL7F4v6i9sc',
  };
  static configGoogleAnalytics:ConfigGoogleAnalytics = {
    propertyId: 'UA-55311687-4'
  };
  static configLogSense:ConfigLogSense = {
    token: 'd032d125-1a39-4129-bfb0-4e3e4afc17e9'
  };
}
