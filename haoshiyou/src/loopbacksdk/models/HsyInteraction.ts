/* tslint:disable */

declare var Object: any;
export interface HsyInteractionInterface {
  "listingId"?: string;
  "type"?: string;
  "uid": string;
  "userId"?: string;
}

export class HsyInteraction implements HsyInteractionInterface {
  "listingId": string = '';
  "type": string = '';
  "uid": string = '';
  "userId": string = '';
  constructor(data?: HsyInteractionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `HsyInteraction`.
   */
  public static getModelName() {
    return "HsyInteraction";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of HsyInteraction for dynamic purposes.
  **/
  public static factory(data: HsyInteractionInterface): HsyInteraction{
    return new HsyInteraction(data);
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
      name: 'HsyInteraction',
      plural: 'HsyInteractions',
      path: 'HsyInteractions',
      idName: 'uid',
      properties: {
        "listingId": {
          name: 'listingId',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "userId": {
          name: 'userId',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
