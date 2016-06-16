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

  //noinspection JSUnusedGlobalSymbols: used in HTML
  clickAdd() {
    this.add.emit(null);
  }

  ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
    if (changes['imageUrls']) {
      this.load();
    }
  }

  load() {
    this.cacheGrid = [];
    this.cacheUrls = this.imageUrls.concat([""]);
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
    let viewer = new window.Viewer(document.getElementById(id), {url:url});
    viewer.show();
  }
}