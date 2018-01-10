export class BaseEnv {
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

export class ConfigGoogleAnalytics {
  propertyId: string;
}
export class ConfigLogSense {
 token: string;
}

export class ConfigHaoshiyouServer {
  serverUrl: string;
}

export enum EnvType {
  Prod,
  Dev
}
