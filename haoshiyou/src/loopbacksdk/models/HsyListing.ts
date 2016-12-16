/* tslint:disable */

declare var Object: any;
export interface HsyListingInterface {
  title: string;
  price: number;
  uid: string;
}

export class HsyListing implements HsyListingInterface {
  title: string = '';
  price: number = 0;
  uid: string = '';
  constructor(data?: HsyListingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `HsyListing`.
   */
  public static getModelName() {
    return "HsyListing";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of HsyListing for dynamic purposes.
  **/
  public static factory(data: HsyListingInterface): HsyListing{
    return new HsyListing(data);
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
      name: 'HsyListing',
      plural: 'HsyListings',
      properties: {
        title: {
          name: 'title',
          type: 'string'
        },
        price: {
          name: 'price',
          type: 'number'
        },
        uid: {
          name: 'uid',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
