import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular/index";
import {ImageIdToUrlPipe} from "../../pipes/image-id-to-url.pipe";

@Component({
  selector: 'remove-modal',
  templateUrl: 'build/pages/listings-tab/remove.modal.html',
  pipes: [ImageIdToUrlPipe]
})
export class RemoveModal {
  private imageIds:string[];
  private checkboxes:boolean[];
  constructor(
      private nav:NavController,
      params:NavParams,
      private viewCtrl:ViewController) {
    this.imageIds = params.data.imageIds;
    this.checkboxes = new Array(this.imageIds.length);
  }

  dismiss() {
    let data = { imageIds: this.imageIds };
    this.viewCtrl.dismiss(data);
  }

  save() {
    let imagesAfterSave:string[] = [];
    for (let i = 0; i < this.checkboxes.length; i++) {
      if (!this.checkboxes[i]) {
        imagesAfterSave.push(this.imageIds[i]);
      }
    }
    this.imageIds = imagesAfterSave;
    this.dismiss();
  }

  cancel() {
    this.dismiss();
  }
}

