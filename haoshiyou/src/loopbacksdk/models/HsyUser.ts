/* tslint:disable */

declare var Object: any;
export interface HsyUserInterface {
  id: string;
}

export class HsyUser implements HsyUserInterface {
  id: string = '';
  constructor(data?: HsyUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `HsyUser`.
   */
  public static getModelName() {
    return "HsyUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of HsyUser for dynamic purposes.
  **/
  public static factory(data: HsyUserInterface): HsyUser{
    return new HsyUser(data);
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
      name: 'HsyUser',
      plural: 'HsyUsers',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
