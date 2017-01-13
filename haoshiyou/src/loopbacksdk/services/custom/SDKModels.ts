/* tslint:disable */
import { Injectable } from '@angular/core';
import { HsyListing } from '../../models/HsyListing';
import { HsyUser } from '../../models/HsyUser';

@Injectable()
export class SDKModels {

  private models: { [name: string]: any } = {
    HsyListing: HsyListing,
    HsyUser: HsyUser,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }
}
