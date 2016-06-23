import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular/index";
import {ImageIdToUrlPipe} from "../../pipes/image-id-to-url.pipe";
import {Listing} from "../../models/listing";

@Component({
  selector: 'remove-modal',
  templateUrl: 'build/pages/listings-tab/remove.modal.html',
  pipes: [ImageIdToUrlPipe]
})
export class RemoveModal {
  private listing:Listing;
  private checkboxes:boolean[];
  constructor(
      private nav:NavController,
      params:NavParams) {
    this.listing = params.data.listing;
    this.checkboxes = new Array(this.listing.imageIds.length);
  }

  save() {
    let imagesAfterSave:string[] = [];
    for (let i = 0; i < this.checkboxes.length; i++) {
      if (!this.checkboxes[i]) {
        imagesAfterSave.push(this.listing.imageIds[i]);
      }
    }
    this.listing.imageIds = imagesAfterSave;
    this.nav.pop();
  }

  cancel() {
    this.nav.pop();
  }
}

