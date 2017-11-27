import {Injectable} from "@angular/core";

declare let google:any;

@Injectable()
export class MapService {
  // TODO(xinbenlv): consider add caching.
  private geocoder;// google.maps.Geocoder;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  public getLocality(latlng/*:google.maps.LatLng*/):Promise<ILocality> {
    return new Promise<ILocality>((resolve, reject) => {
      this.geocoder.geocode(/*<google.maps.GeocoderRequest>*/{'latLng': latlng}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            let zip:string = "";
            let city:string = "";
            let county:string = "";
            //find country name
            for (var i = 0; i < results[0].address_components.length; i++) {

              var componeaddress_components = results[0].address_components[i];

              for (var b = 0; b < componeaddress_components.types.length; b++) {
                console.log(`XXX componeaddress_components = ${JSON.stringify(componeaddress_components)}`);
                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate

                console.log(`XXX componeaddress_components.types[b] = ${JSON.stringify(componeaddress_components.types[b])}`);
                if (componeaddress_components.types[b] == "locality") {
                  //this is the object you are looking for
                  city = componeaddress_components.short_name;
                }
                if (componeaddress_components.types[b] == "postal_code") {
                  //this is the object you are looking for
                  zip = componeaddress_components.short_name;
                }
                if (componeaddress_components.types[b] == "administrative_area_level_2") {
                  county = componeaddress_components.short_name;
                }
              }
            }
            return resolve(<ILocality>{
              city: city, zip: zip,
              county: county
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
  county:string;
}
