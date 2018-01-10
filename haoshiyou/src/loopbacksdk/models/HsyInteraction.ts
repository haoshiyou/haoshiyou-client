/* tslint:disable */

declare var Object: any;
export interface HsyInteractionInterface {
  "uid": string;
  "listingId"?: string;
  "type"?: string;
  "userId"?: string;
  "interactionTime": Date;
}

export class HsyInteraction implements HsyInteractionInterface {
  "uid": string = '';
  "listingId": string = '';
  "type": string = '';
  "userId": string = '';
  "interactionTime": Date = new Date(0);
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
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "listingId": {
          name: 'listingId',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "userId": {
          name: 'userId',
          type: 'string'
        },
        "interactionTime": {
          name: 'interactionTime',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
