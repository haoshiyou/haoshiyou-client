import {Injectable, Inject} from "@angular/core";
import {Logger} from "log4javascript";
import * as g from "googlemaps";
import {loggerToken} from "./log.service";

@Injectable()
export class MapService {
  // TODO(xinbenlv): consider add caching.
  private geocoder:g.google.maps.Geocoder;

  constructor(@Inject(loggerToken) private logger:Logger) {
    this.geocoder = new g.google.maps.Geocoder();
    this.logger.debug("Initialized MapService.");
  }

  public getLocality(latlng:g.google.maps.LatLng):Promise<ILocality> {
    return new Promise<ILocality>((resolve, reject) => {
      this.geocoder.geocode(<g.google.maps.GeocoderRequest>{'latLng': latlng}, function (results, status) {
        if (status == g.google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            let zip:string = "";
            let city:string = "";
            //find country name
            for (var i = 0; i < results[0].address_components.length; i++) {

              var componeaddress_components = results[0].address_components[i];
              for (var b = 0; b < componeaddress_components.types.length; b++) {

                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (componeaddress_components.types[b] == "locality") {
                  //this is the object you are looking for
                  city = componeaddress_components.short_name;
                }
                if (componeaddress_components.types[b] == "postal_code") {
                  //this is the object you are looking for
                  zip = componeaddress_components.short_name;
                }
              }
            }
            return resolve(<ILocality>{
              city: city, zip: zip
            });
          }
        }
        reject(status); // TODO(xinbenlv): consider add status
      });
    });
  }
}

export interface ILocality {
  city:string;
  zip:string;
}
