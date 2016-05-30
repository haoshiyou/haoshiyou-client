import {Pipe, PipeTransform} from "@angular/core";
import {MapService, ILocality} from "../services/map.service";

@Pipe({
  name: 'cityNZipPipe',
})
export class CityNZipPipe implements PipeTransform {
  constructor(private mapService:MapService) {
  }

  transform(latlng:google.maps.LatLng):Promise<string> {
    return this.mapService.getLocality(latlng).then((locality:ILocality) => {
      return locality.city + "," + locality.zip;
    }).catch((e:any) => {
      console.log(e);
      return Promise.resolve("Unknown City");
    });
  }
}