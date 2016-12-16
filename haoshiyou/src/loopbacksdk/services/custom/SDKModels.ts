/* tslint:disable */
import { Injectable } from '@angular/core';
import { HsyListing } from '../../models/HsyListing';

@Injectable()
export class SDKModels {

  private models: { [name: string]: any } = {
    HsyListing: HsyListing,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }
}
