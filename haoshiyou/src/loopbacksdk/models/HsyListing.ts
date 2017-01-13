/* tslint:disable */
import {
  GeoPoint
} from '../index';

declare var Object: any;
export interface HsyListingInterface {
  title: string;
  price: number;
  uid: string;
  location?: GeoPoint;
  content?: string;
  type?: number;
  ownerId?: string;
  lastUpdated: Date;
  imageIds?: Array<string>;
}

export class HsyListing implements HsyListingInterface {
  title: string = '';
  price: number = 0;
  uid: string = '';
  location: GeoPoint = <any>null;
  content: string = '';
  type: number = 0;
  ownerId: string = '';
  lastUpdated: Date = new Date(0);
  imageIds: Array<string> = <any>[];
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
        location: {
          name: 'location',
          type: 'GeoPoint'
        },
        content: {
          name: 'content',
          type: 'string'
        },
        type: {
          name: 'type',
          type: 'number'
        },
        ownerId: {
          name: 'ownerId',
          type: 'string'
        },
        lastUpdated: {
          name: 'lastUpdated',
          type: 'Date'
        },
        imageIds: {
          name: 'imageIds',
          type: 'Array&lt;string&gt;'
        },
      },
      relations: {
      }
    }
  }
}
