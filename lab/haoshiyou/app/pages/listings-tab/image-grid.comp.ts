import {Component, OnChanges, Input, Output, EventEmitter, SimpleChange} from "@angular/core";
import {ImageIdToUrlPipe} from "../../pipes/image-id-to-url.pipe";
import {IImageService} from "../../services/image.service";

declare let window;
@Component({
  selector: 'image-grid',
  templateUrl: 'build/pages/listings-tab/image-grid.comp.html',
  pipes: [ImageIdToUrlPipe]
})
export class ImageGridComponent implements OnChanges {

  @Input() imageIds:string[];
  @Input() isEdit:boolean; // cannot be true due to https://bugs.webkit.org/show_bug.cgi?id=138038
  private cacheGrid:string[][];
  private cacheUrls:string[];

  constructor(private imageService:IImageService) {
  }
  @Output()
  add = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  //noinspection JSUnusedGlobalSymbols: used in HTML
  clickAdd() {
    this.add.emit(null);
  }

  //noinspection JSUnusedGlobalSymbols: used in HTML
  clickDelete() {
    this.delete.emit(null);
  }

  ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
    if (changes['imageIds']) {
      this.load();
    }
  }

  load() {
    this.cacheGrid = [];
    this.cacheUrls = this.imageIds.concat(["add", "delete"]);
    let row:string[];
    for (let i = 0; i < this.cacheUrls.length; i++) {
      if (i % 3 == 0) {
        row = [];
      }
      row.push(this.cacheUrls[i]);
      if (i % 3 == 0) {
        this.cacheGrid.push(row);
      }
    }
  }

  showImage(imageId) {
    let el = document.getElementsByTagName('body');
    // TODO(xinbenlv): modify the viewerjs to customize the following
    // 1. click on background area to close
    let url = this.imageService.getUrlFromId(imageId, 0, 0);
    let viewer = new window.Viewer(el[0],
        {
          url: () => {
            return url;
          },
          inline:false,
          toolbar: true,
          title: false,
          movable: true,
          keyboard: false,
          navbar: true,
          hidden: () => {
            viewer.destroy();
          }
        });
    viewer.show();
  }
}