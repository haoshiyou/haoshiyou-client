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
  "addressLine"?: string;
  "addressZipcode"?: string;
  "addressState"?: string;
  "addressCity"?: string;
  "addressCityAndState"?: string;
  "amenityArray"?: Array<any>;
  "location_lat"?: number;
  "location_lng"?: number;
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
  "addressLine": string = '';
  "addressZipcode": string = '';
  "addressState": string = '';
  "addressCity": string = '';
  "addressCityAndState": string = '';
  "amenityArray": Array<any> = <any>[];
  "location_lat": number = 0;
  "location_lng": number = 0;
  owner: HsyUser = null;
  interactions: HsyInteraction[] = null;
  constructor(data?: HsyListingInterface) {
    Object.assign(this, data);
  }
  /**
   * regenerate title
   */
  private getReTitle(): string{
    return this.isGoodTitle() ? this.title : this.genReTitle();
  }
  /**
   * good title should contain following information
   * 1: 出租、求租
   * 2: 地点
   * 3: 房间
   * 4: available date
   */
  private isGoodTitle(): boolean{
    let targets = ["出租","招租","求租","转租","合租","长租","短租","找室友","招室友"];
    let includeTarget = this.includesValue(this.title, targets);
    let cities = ["san","santa","francisco","berkeley","oakland","mateo","palo alto","daly","forster","redwood","menlo park","stanford","mountain view","sunnyvale","cupertino","jose","santa clara","campbell","milpitas","fremont","newark","union","hayward","东湾","南湾","三番","旧金山","区","半岛"];
    let includeLocation = this.includesValue(this.title.toLowerCase(), cities);
    let rooms = ["主卧","次卧","单房","两房","1B1B","2B1B","2B2B","4B","3B","2B","1B","猫","狗"];
    let includeRoom = this.includesValue(this.title, rooms);
    return includeTarget && includeLocation && includeRoom;
  }
  /**
   * simply helper function to match any available values in content
   */
  private includesValue(content:string, values:Array<any>): boolean{
    for (let i = 0; i < values.length; i++) {
      if (content.includes(values[i])) {
        return true;
      }
    }
    return false;
  }
  /**
   * generate reTitle by: [出租] 1b1b @ Sunnyvale, 8月起
   */
  private genReTitle(): string{
    let targets = ["出租","招租","求租","转租","合租","长租","短租","找室友","招室友"];
    let rooms = ["主卧","次卧","单房","两房","1B1B","2B1B","2B2B","4B","3B","2B","1B","猫","狗"];
    return "[" + this.getValue(this.content, targets, "信息") + "]"
        + " " + this.getValue(this.content, rooms, "有一房间")
        + " @ " + (this.addressCity ? this.addressCity.charAt(0).toUpperCase() + this.addressCity.slice(1) : "湾区")
        + (this.addressZipcode ? ", " + this.addressZipcode : "");
  }
  /**
   * retrieve any matched values in content
   */
  private getValue(content:string, values:Array<any>, defaultValue:string): string{
    for (let i = 0; i < values.length; i++) {
      if (content.includes(values[i])) {
        return values[i];
      }
    }
    return defaultValue;
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
        "addressCity": {
          name: 'addressCity',
          type: 'string'
        },
        "addressCityAndState": {
          name: 'addressCityAndState',
          type: 'string'
        },
        "amenityArray": {
          name: 'amenityArray',
          type: 'Array&lt;any&gt;'
        },
        "location_lat": {
          name: 'location_lat',
          type: 'number'
        },
        "location_lng": {
          name: 'location_lng',
          type: 'number'
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
