/* tslint:disable */
import {
  HsyInteraction,
  GeoPoint
} from '../index';

declare var Object: any;
export interface HsyListingInterface {
  "addressCityAndState"?: string;
  "addressLine"?: string;
  "amenities"?: any;
  "content"?: string;
  "hsyGroupEnum"?: string;
  "hsyGroupNick"?: string;
  "imageIds"?: Array<any>;
  "isRentingEntireHouse"?: boolean;
  "lastUpdated"?: Date;
  "listingTypeEnum"?: string;
  "location"?: GeoPoint;
  "numBathRoom"?: number;
  "numBedRoom"?: number;
  "otherCosts"?: any;
  "ownerId": string;
  "price"?: number;
  "rentalEndDate"?: Date;
  "rentalStartDate"?: Date;
  "requireToContact"?: string;
  "singleRoomBathRoomType"?: string;
  "state"?: string;
  "title"?: string;
  "type"?: number;
  "uid": string;
  "wechatId"?: string;
  interactions?: HsyInteraction[];
}

export class HsyListing implements HsyListingInterface {
  "addressCityAndState": string = '';
  "addressLine": string = '';
  "amenities": any = <any>null;
  "content": string = '';
  "hsyGroupEnum": string = '';
  "hsyGroupNick": string = '';
  "imageIds": Array<any> = <any>[];
  "isRentingEntireHouse": boolean = false;
  "lastUpdated": Date = new Date(0);
  "listingTypeEnum": string = '';
  "location": GeoPoint = <any>null;
  "numBathRoom": number = 0;
  "numBedRoom": number = 0;
  "otherCosts": any = <any>null;
  "ownerId": string = '';
  "price": number = 0;
  "rentalEndDate": Date = new Date(0);
  "rentalStartDate": Date = new Date(0);
  "requireToContact": string = '';
  "singleRoomBathRoomType": string = '';
  "state": string = '';
  "title": string = '';
  "type": number = 0;
  "uid": string = '';
  "wechatId": string = '';
  interactions: HsyInteraction[] = null;
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
      path: 'HsyListings',
      idName: 'uid',
      properties: {
        "addressCityAndState": {
          name: 'addressCityAndState',
          type: 'string'
        },
        "addressLine": {
          name: 'addressLine',
          type: 'string'
        },
        "amenities": {
          name: 'amenities',
          type: 'any'
        },
        "content": {
          name: 'content',
          type: 'string'
        },
        "hsyGroupEnum": {
          name: 'hsyGroupEnum',
          type: 'string'
        },
        "hsyGroupNick": {
          name: 'hsyGroupNick',
          type: 'string'
        },
        "imageIds": {
          name: 'imageIds',
          type: 'Array&lt;any&gt;'
        },
        "isRentingEntireHouse": {
          name: 'isRentingEntireHouse',
          type: 'boolean'
        },
        "lastUpdated": {
          name: 'lastUpdated',
          type: 'Date'
        },
        "listingTypeEnum": {
          name: 'listingTypeEnum',
          type: 'string'
        },
        "location": {
          name: 'location',
          type: 'GeoPoint'
        },
        "numBathRoom": {
          name: 'numBathRoom',
          type: 'number'
        },
        "numBedRoom": {
          name: 'numBedRoom',
          type: 'number'
        },
        "otherCosts": {
          name: 'otherCosts',
          type: 'any'
        },
        "ownerId": {
          name: 'ownerId',
          type: 'string'
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "rentalEndDate": {
          name: 'rentalEndDate',
          type: 'Date'
        },
        "rentalStartDate": {
          name: 'rentalStartDate',
          type: 'Date'
        },
        "requireToContact": {
          name: 'requireToContact',
          type: 'string'
        },
        "singleRoomBathRoomType": {
          name: 'singleRoomBathRoomType',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'number'
        },
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "wechatId": {
          name: 'wechatId',
          type: 'string'
        },
      },
      relations: {
        interactions: {
          name: 'interactions',
          type: 'HsyInteraction[]',
          model: 'HsyInteraction',
          relationType: 'hasMany',
                  keyFrom: 'uid',
          keyTo: 'listingId'
        },
      }
    }
  }
}
