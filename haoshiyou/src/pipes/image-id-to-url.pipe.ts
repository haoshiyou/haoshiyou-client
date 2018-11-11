import {Pipe, PipeTransform} from "@angular/core";
import {IImageService} from "../services/image.service";

@Pipe({
  name: 'imageIdsToUrlPipe',
})
export class ImageIdsToUrlPipe implements PipeTransform {
  constructor(private imageService:IImageService) {
  }

  transform(ids:string[]):string[] {
    return ids.map((id:string) => {
      return this.imageService.getUrlFromId(id);
    });
  }

}

@Pipe({
  name: 'imageIdToUrlPipe',
})
export class ImageIdToUrlPipe implements PipeTransform {
  constructor(private imageService:IImageService) {
  }

  transform(id:string, mode:string = "default"):string {
    if (mode == "default") {
      return this.imageService.getUrlFromId(id);
    } else if (mode == "full") {
      return this.imageService.getUrlFromId(id, 0, 0);
    } else if (mode == "thumbnail") {
      return this.imageService.getUrlFromId(id, 400, 300);
    }
  }

}