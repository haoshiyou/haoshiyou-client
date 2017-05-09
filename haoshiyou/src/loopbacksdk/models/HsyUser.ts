/* tslint:disable */

declare var Object: any;
export interface HsyUserInterface {
  "avatarId"?: string;
  "id": string;
  "name"?: string;
  "pushNotificationRegIds"?: Array<any>;
  "weixin"?: string;
  "created"?: Date;
  "lastUpdated"?: Date;
}

export class HsyUser implements HsyUserInterface {
  "avatarId": string = '';
  "id": string = '';
  "name": string = '';
  "pushNotificationRegIds": Array<any> = <any>[];
  "weixin": string = '';
  "created": Date = new Date(0);
  "lastUpdated": Date = new Date(0);
  constructor(data?: HsyUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `HsyUser`.
   */
  public static getModelName() {
    return "HsyUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of HsyUser for dynamic purposes.
  **/
  public static factory(data: HsyUserInterface): HsyUser{
    return new HsyUser(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'HsyUser',
      plural: 'HsyUsers',
      properties: {
        "avatarId": {
          name: 'avatarId',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "pushNotificationRegIds": {
          name: 'pushNotificationRegIds',
          type: 'Array&lt;any&gt;'
        },
        "weixin": {
          name: 'weixin',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "lastUpdated": {
          name: 'lastUpdated',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
