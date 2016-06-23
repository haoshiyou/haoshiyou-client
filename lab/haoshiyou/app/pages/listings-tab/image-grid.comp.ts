import {Component, OnChanges, Input, Output, EventEmitter, SimpleChange} from "@angular/core";

declare let window;
@Component({
  selector: 'image-grid',
  templateUrl: 'build/pages/listings-tab/image-grid.comp.html'
})
export class ImageGridComponent implements OnChanges {

  @Input() imageUrls:string[];
  @Input() isEdit:boolean; // cannot be true due to https://bugs.webkit.org/show_bug.cgi?id=138038
  private cacheGrid:string[][];
  private cacheUrls:string[];

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
    if (changes['imageUrls']) {
      this.load();
    }
  }

  load() {
    this.cacheGrid = [];
    this.cacheUrls = this.imageUrls.concat(["add", "delete"]);
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

  showImage(url, row, col) {
    let id:string = `image-${row}-${col}`;
    let el = document.getElementsByTagName('body');
    // TODO(xinbenlv): modify the viewerjs to customize the following
    // 1. click on background area to close
    let viewer = new window.Viewer(el[0],
        {
          url:url,
          inline:false,
          toolbar: false,
          title: false,
          movable: true,
          keyboard: false,
          navbar: false
        });
    viewer.show();
  }
}