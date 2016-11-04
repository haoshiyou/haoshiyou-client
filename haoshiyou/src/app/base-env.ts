export class BaseEnv {
  static version = "3.5.0";
  static envType:EnvType = EnvType.Dev;
  static flags = {};
  static configFirebase:ConfigFirebase = {
    apiKey: 'N/A',
    authDomain: 'N/A',
    databaseURL: 'N/A',
    storageBucket: "N/A",
    messagingSenderId: "N/A"
  };
  static configAuth0:ConfigAuth0 = {
    clientId: 'N/A',
    accountDomain: 'N/A',
  };
  static configCloudinary:ConfigCloudinary = {
    cloudName: 'N/A',
    apiKey: 'N/A',
    uploadPreset: 'N/A',
  };
  static configFirebaseCloudMessage:ConfigFirebaseCloudMessage = {
    senderId: 'N/A',
    key: 'N/A',
  };
  static configGoogleAnalytics:ConfigGoogleAnalytics = {
    propertyId: 'N/A'
  };
  static configLogSense:ConfigLogSense = {
    token: 'N/A'
  };
}

export class ConfigFirebase {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  storageBucket: string;
  messagingSenderId: string;
}

export class ConfigAuth0 {
  clientId: string;
  accountDomain: string;
}

export class ConfigCloudinary {
  cloudName: string;
  apiKey: string;
  uploadPreset: string;
}

export class ConfigFirebaseCloudMessage {
  senderId: string;
  key: string;
}

export class ConfigGoogleAnalytics {
  propertyId: string;
}
export class ConfigLogSense {
 token: string;
}

export enum EnvType {
  Prod,
  Dev
}
