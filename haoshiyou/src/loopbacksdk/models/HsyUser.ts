/* tslint:disable */
import {
  HsyListing
} from '../index';

declare var Object: any;
export interface HsyUserInterface {
  "avatarId"?: string;
  "contactEmail"?: string;
  "contactPhone"?: string;
  "created"?: Date;
  "id": string;
  "lastUpdated"?: Date;
  "name"?: string;
  "pushNotificationRegIds"?: Array<any>;
  "weixin"?: string;
  listings?: HsyListing[];
}

export class HsyUser implements HsyUserInterface {
  "avatarId": string = '';
  "contactEmail": string = '';
  "contactPhone": string = '';
  "created": Date = new Date(0);
  "id": string = '';
  "lastUpdated": Date = new Date(0);
  "name": string = '';
  "pushNotificationRegIds": Array<any> = <any>[];
  "weixin": string = '';
  listings: HsyListing[] = null;
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
      path: 'HsyUsers',
      idName: 'id',
      properties: {
        "avatarId": {
          name: 'avatarId',
          type: 'string'
        },
        "contactEmail": {
          name: 'contactEmail',
          type: 'string'
        },
        "contactPhone": {
          name: 'contactPhone',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'string'
        },
        "lastUpdated": {
          name: 'lastUpdated',
          type: 'Date'
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
      },
      relations: {
        listings: {
          name: 'listings',
          type: 'HsyListing[]',
          model: 'HsyListing',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'ownerId'
        },
      }
    }
  }
}
