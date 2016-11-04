import {Component, Input, Output, EventEmitter, Inject, OnInit} from "@angular/core";
import {IImageService} from "../../services/image.service";
import {ICredentialService} from "../../services/credential.service";
import {RemoveModal} from "./remove.modal";
import {Modal, NavController, ModalController, Platform} from "ionic-angular";

declare let window;
declare let $; // jQuery
declare let document;
declare let JSON;
@Component({
  selector: 'image-grid',
  templateUrl: 'image-grid.comp.html',
})
export class ImageGridComponent implements OnInit {
  ngOnInit():any {
    this.platform.ready().then(()=> {
      this.initUploader();
    });
  }

  // TODO(xinbenlv): merge input and output to a single [()]
  @Input()
  imageIds: string[];

  @Output()
  updateImageIds = new EventEmitter<string[]>();

  private removeModal:Modal;

  //noinspection JSUnusedGlobalSymbols, used in HTML
  /**
   * TODO(xinbenlv): We cannot pre-assign [isEdit] to true here because of to
   * https://bugs.webkit.org/show_bug.cgi?id=138038 revisit in the future.
   */
  @Input() isEdit:boolean;

  constructor(
      private imageService:IImageService,
      private cred:ICredentialService,
      private nav:NavController,
      private modalCtrl:ModalController,
      private platform:Platform) {
  }

  //noinspection JSUnusedLocalSymbols, used in HTML
  private showImage(imageId) {
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

  private initUploader() {
    var uploadImageFormData = {
      "timestamp":$.now(),
      "api_key":this.cred.getCred('CLOUDINARY_API_KEY'),
      "upload_preset":this.cred.getCred('CLOUDINARY_UPLOAD_PRESET'),
    };
    var escapedFormData = JSON.stringify(uploadImageFormData);
    $('.cloudinary-fileupload')
        .attr("data-form-data", escapedFormData)
        .bind('cloudinarydone',
            (e, data) => {
              if (!this.imageIds) this.imageIds = [];
              this.onUpdateImageIds( this.imageIds.concat(data.result.public_id));
              return true;
            })
        .cloudinary_fileupload();
  }

  //noinspection JSUnusedLocalSymbols, used in HTML
  private clickDelete() {
    this.removeModal = this.modalCtrl.create(RemoveModal, {imageIds: this.imageIds});
    this.removeModal.onDidDismiss((data)=>{
      this.onUpdateImageIds(data.imageIds);
    });

    this.removeModal.present();
  }

  private onUpdateImageIds(imageIds:string[]) {
    this.imageIds = imageIds;
    this.updateImageIds.emit(this.imageIds);  // notify parent
  }

}
