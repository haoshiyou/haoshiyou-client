import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular/index";

@Component({
  selector: 'remove-modal',
  templateUrl: 'remove.modal.html',
})
export class RemoveModal {
  imageIds:string[];
  checkboxes:boolean[];
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

