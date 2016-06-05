import {Pipe, PipeTransform} from "@angular/core";
import {IImageService} from "../services/image.service";

@Pipe({
  name: 'imageIdToUrlPipe',
})
export class ImageIdToUrlPipe implements PipeTransform {
  constructor(private imageService:IImageService) {
  }

  transform(ids:string[]):string[] {
    return ids.map((id:string) => {
      return this.imageService.getUrlFromId(id);
    });
  }
}