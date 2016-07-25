import {Component, Input, Output, EventEmitter, Inject, OnInit} from "@angular/core";
import {ImageIdToUrlPipe} from "../../pipes/image-id-to-url.pipe";
import {IImageService} from "../../services/image.service";
import {ICredentialService} from "../../services/credential.service";
import {loggerToken} from "../../services/log.service";
import {RemoveModal} from "./remove.modal";
import {Logger} from "log4javascript";
import {Modal, NavController, Platform} from "ionic-angular";

declare let window;
declare let $; // jQuery
@Component({
  selector: 'image-grid',
  templateUrl: 'build/pages/listings-tab/image-grid.comp.html',
  pipes: [ImageIdToUrlPipe]
})
export class ImageGridComponent implements OnInit {
  ngOnInit():any {
    this.platform.ready().then(()=> {
      this.initUploader();
    });
  }

  // TODO(xinbenlv): merge input and output to a single [()]
  @Input()
  private imageIds: string[];

  @Output()
  private updateImageIds = new EventEmitter<string[]>();

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
      private platform:Platform,
      @Inject(loggerToken) private logger:Logger) {
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
    // TODO(wrj): determine whether the cloudinaryCorsHtml is still needed
    var cloudinaryCorsHtml = document.location.origin + "/cloudinary_cors.html";
    var uploadImageFormData = {
      "timestamp":$.now(),
      "callback": cloudinaryCorsHtml,
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
              this.logger.info(`Listing added imageIds: ${JSON.stringify(data.result.public_id)}`);
              this.logger.debug(`Listing result imageIds: ${JSON.stringify(this.imageIds)}`);
              return true;
            })
        .cloudinary_fileupload();
  }

  //noinspection JSUnusedLocalSymbols, used in HTML
  private clickDelete() {
    this.removeModal = Modal.create(RemoveModal, {imageIds: this.imageIds});
    this.removeModal.onDismiss((data)=>{
      this.onUpdateImageIds(data.imageIds);
    });

    this.nav.present(this.removeModal, {animate: true});
  }

  private onUpdateImageIds(imageIds:string[]) {
    this.imageIds = imageIds;
    this.updateImageIds.emit(this.imageIds);  // notify parent
   }

}