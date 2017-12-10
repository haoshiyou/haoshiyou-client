/* tslint:disable */
import {
  HsyUser,
  HsyInteraction,
  GeoPoint
} from '../index';

declare var Object: any;
export interface HsyListingInterface {
  "amenities"?: any;
  "content"?: string;
  "hsyGroupEnum"?: string;
  "hsyGroupNick"?: string;
  "rentalEndDate"?: Date;
  "rentalStartDate"?: Date;
  "title"?: string;
  "uid": string;
  "wechatId"?: string;
  "latestUpdatedOrBump"?: Date;
  "numBathRoom"?: number;
  "numBedRoom"?: number;
  "isRentingEntireHouse"?: boolean;
  "lastUpdated"?: Date;
  "imageIds"?: Array<any>;
  "location"?: GeoPoint;
  "listingTypeEnum"?: string;
  "otherCosts"?: any;
  "ownerId": string;
  "price"?: number;
  "requireToContact"?: Array<any>;
  "singleRoomBathRoomType"?: string;
  "state"?: string;
  "type"?: number;
  "addressCity"?: string;
  "addressLine"?: string;
  "addressZipcode"?: string;
  "addressState"?: string;
  owner?: HsyUser;
  interactions?: HsyInteraction[];
}

export class HsyListing implements HsyListingInterface {
  "amenities": any = <any>null;
  "content": string = '';
  "hsyGroupEnum": string = '';
  "hsyGroupNick": string = '';
  "rentalEndDate": Date = new Date(0);
  "rentalStartDate": Date = new Date(0);
  "title": string = '';
  "uid": string = '';
  "wechatId": string = '';
  "latestUpdatedOrBump": Date = new Date(0);
  "numBathRoom": number = 0;
  "numBedRoom": number = 0;
  "isRentingEntireHouse": boolean = false;
  "lastUpdated": Date = new Date(0);
  "imageIds": Array<any> = <any>[];
  "location": GeoPoint = <any>null;
  "listingTypeEnum": string = '';
  "otherCosts": any = <any>null;
  "ownerId": string = '';
  "price": number = 0;
  "requireToContact": Array<any> = <any>[];
  "singleRoomBathRoomType": string = '';
  "state": string = '';
  "type": number = 0;
  "addressCity": string = '';
  "addressLine": string = '';
  "addressZipcode": string = '';
  "addressState": string = '';
  owner: HsyUser = null;
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
        "rentalEndDate": {
          name: 'rentalEndDate',
          type: 'Date'
        },
        "rentalStartDate": {
          name: 'rentalStartDate',
          type: 'Date'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "uid": {
          name: 'uid',
          type: 'string'
        },
        "wechatId": {
          name: 'wechatId',
          type: 'string'
        },
        "latestUpdatedOrBump": {
          name: 'latestUpdatedOrBump',
          type: 'Date'
        },
        "numBathRoom": {
          name: 'numBathRoom',
          type: 'number'
        },
        "numBedRoom": {
          name: 'numBedRoom',
          type: 'number'
        },
        "isRentingEntireHouse": {
          name: 'isRentingEntireHouse',
          type: 'boolean'
        },
        "lastUpdated": {
          name: 'lastUpdated',
          type: 'Date'
        },
        "imageIds": {
          name: 'imageIds',
          type: 'Array&lt;any&gt;'
        },
        "location": {
          name: 'location',
          type: 'GeoPoint'
        },
        "listingTypeEnum": {
          name: 'listingTypeEnum',
          type: 'string'
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
        "requireToContact": {
          name: 'requireToContact',
          type: 'Array&lt;any&gt;'
        },
        "singleRoomBathRoomType": {
          name: 'singleRoomBathRoomType',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'number'
        },
        "addressCity": {
          name: 'addressCity',
          type: 'string'
        },
        "addressLine": {
          name: 'addressLine',
          type: 'string'
        },
        "addressZipcode": {
          name: 'addressZipcode',
          type: 'string'
        },
        "addressState": {
          name: 'addressState',
          type: 'string'
        },
      },
      relations: {
        owner: {
          name: 'owner',
          type: 'HsyUser',
          model: 'HsyUser',
          relationType: 'belongsTo',
                  keyFrom: 'ownerId',
          keyTo: 'id'
        },
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
