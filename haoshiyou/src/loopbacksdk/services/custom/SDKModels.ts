/* tslint:disable */
import { Injectable } from '@angular/core';
import { HsyListing } from '../../models/HsyListing';
import { HsyUser } from '../../models/HsyUser';
import { HsyInteraction } from '../../models/HsyInteraction';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    HsyListing: HsyListing,
    HsyUser: HsyUser,
    HsyInteraction: HsyInteraction,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
