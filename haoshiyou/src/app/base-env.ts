export class BaseEnv {
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
