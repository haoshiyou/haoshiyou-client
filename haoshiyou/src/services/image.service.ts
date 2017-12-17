import {Injectable, Inject} from "@angular/core";
import {TransferObject, Transfer} from "@ionic-native/transfer";
import {Env} from "../app/env";
declare let JSON;

@Injectable()
export class IImageService {

  /**
   * @param localUris
   * @returns {Promise<any>|Promise<TAll[]>} a list of public id of stored image.
   * In failure, it will reject at the first failure and tell why,
   */
  uploadImagesAndGetIds(localUris:string[]):Promise<string[]> {
    throw "Not implemented";
  };

  /**
   * Get a url string from image id.
   * @param id
   */
  getUrlFromId(id:string, width:number = 200, height:number = 100):string {
    throw "Not implemented";
  }
}

@Injectable()
export class CloudinaryImageService implements IImageService {
  private config:CloudinaryConfig;

  constructor(private transfer: Transfer) {
    // TODO(xinbenlv): update the credentials of CloudinaryImageService.
    this.config = <CloudinaryConfig>{
      cloud_name: Env.configCloudinary.cloudName,
      api_key: Env.configCloudinary.apiKey,
      upload_preset: Env.configCloudinary.uploadPreset
    };
  }

  /**
   * override
   */
  uploadImagesAndGetIds(localUris:string[]):Promise<any[]> {
    let fileTransfer: TransferObject = this.transfer.create();
    let uploadUrl:string = "https://api.cloudinary.com/v1_1/" + this.config.cloud_name + "/image/upload";
    return Promise.all(
        localUris.map((uri:string) => {
          return fileTransfer.upload(uri, uploadUrl, {
            params: this.config
          }).then((result)=> {
            let data = JSON.parse(result['response']);
            return data.public_id;
          }).catch((error)=> {
          });
        })
    );
  }

  //noinspection JSUnusedGlobalSymbols
  /**
   * override
   */
  getUrlFromId(id:string, width:number = 300, height:number = 200):string {
    let param = "c_fill,g_north";
    if (width == 0 && height == 0) { // full
      let ion_card_width = 560; //TODO: get the card width
      param += ',w_' + ion_card_width; // 1242 is the width of iphone 6plus.
      // param = 'w_300,h_150,c_fill,g_auto';
    } else if (width == 0) {
      param += `,h_${height}`;
    } else if (height == 0 ){
      param += `,w_${width}`;
    } else {
      param += `,w_${width},h_${height}`;
    }
    return `http://res.cloudinary.com/${this.config.cloud_name}/image/upload/${param}/${id}.jpg`;
  }
}

interface CloudinaryConfig {
  cloud_name:string,
  api_key:string,
  upload_preset:string,
}
