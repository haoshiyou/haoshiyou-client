import {Page, NavParams, NavController} from "ionic-angular";
import {Listing} from "../../models/listing";
import {EnumMsgPipe} from "../../pipes/enum-msg.pipe.ts";
import {TimeFromNowPipe} from "../../pipes/time-from-now.pipe";
import {IThreadService} from "../../services/chats/thread.service";
import {Thread, User} from "../../models/models";
import {IUserService} from "../../services/chats/user.service";
import {ChatWindowPage} from "../chats-tab/chat-window.page";
import {ImageIdToUrlPipe} from "../../pipes/image-id-to-url.pipe";
import {ImageGridComponent} from "./image-grid.comp";
import {MapViewComponent} from "./map-view.comp";
import {loggerToken, LogService} from "../../services/log.service";
import {Inject} from "@angular/core";
import {Logger} from "log4javascript";
import {CreationPage} from "./listing-creation.page";
import {IImageService} from "../../services/image.service";

declare let window:any;
declare let $; // jQuery
declare let html2canvas;
@Page({
  templateUrl: 'build/pages/listings-tab/listing-detail.page.html',
  pipes: [EnumMsgPipe, TimeFromNowPipe, ImageIdToUrlPipe],
  directives: [ImageGridComponent, MapViewComponent]
})
export class ListingDetailPage {
  private listing:Listing;
  private owner:User;
  private meId:string;
  public static get GOOGLE_MAPS_KEY(): string { return 'AIzaSyDilZ69sI7zcszD1XWZ6oeV4IW8rufebMY'; }
  constructor(private threadService:IThreadService,
              private userService:IUserService,
              private nav:NavController,
              @Inject(loggerToken)
              private logger:Logger,
              params:NavParams,
              private imageService:IImageService,
              private logService:LogService) {
    this.listing = params.data.listing;
    this.logger.info(`Entering detail page for ${JSON.stringify(this.listing)}`);
    this.userService.observableUserById(this.listing.ownerId).subscribe((owner:User)=> {
      this.logger.debug(`owner=${JSON.stringify(owner)}`);
      this.owner = owner;
    });
    this.userService.promiseMe().then((me:User)=>{
      if (me) {
        this.meId = me.id;
      }
    });
    this.userService.observableMeId().subscribe((meId:string)=>{
      this.logger.debug(`meId=${meId}`);
      this.meId = meId;
    });
  }

  edit() {
    this.nav.push(CreationPage, {listing: this.listing});
  }

  startChat() {
    this.logService.logEvent("listing-detail", "start-chat");
    // TODO(xinbenlv): handle when not yet logged in.
    let thread:Thread = <Thread>{};
    this.userService.promiseMe().then((me:User)=> {
      let newThreadId:string = me.id + '|' + this.listing.id;
      thread.id = newThreadId;
      thread.userIds = [me.id, this.listing.ownerId];
      this.logger.debug(`Creating chat thread ${JSON.stringify(thread)}`);
      return this.threadService.createThread(thread);
    }).then(() => {
      this.nav.push(ChatWindowPage, {thread: thread});
    });
  }
  
  longImage() {
    this.reDrawMap();
    //TODO resize image
    var element = $("ion-card");
    var originWidth = element.width();
    var originHeight = element.height();
    var longImgWidth = 400;
    var longImgHeight = longImgWidth * originHeight / originWidth;
    var canvasHeight = $("ion-card").height() * 1.05;
    var globalCanvas;
    $("ion-card")[0].ownerDocument.defaultView.innerHeight = canvasHeight;
    html2canvas($("ion-card"), {
      onrendered: (canvas)=>{
        //ref1: http://techslides.com/save-svg-as-an-image
        //ref2: https://blog.codepen.io/2013/10/08/cross-domain-images-tainted-canvas/
        canvas.style.width = longImgWidth + 'px';
        canvas.style.height = longImgHeight + 'px';
        var img = canvas.toDataURL()
        this.recoverMap();
        window.open(img);
      },
      useCORS: true,
      allowTaint: false
    } );
  }

  private reDrawMap() {
    var mapView = $("map-view"); 
    var size = mapView.width() + "x" + mapView.height();
    mapView.hide();
    if ($("#static-map").children().length == 0) {
      var img = new Image();
      var url = "https://maps.googleapis.com/maps/api/staticmap?"
          + "&zoom=9&size=" + size 
          + "&maptype=roadmap&markers=color:red|" 
          + this.listing.lat + "," + this.listing.lng
          + "&key=" + ListingDetailPage.GOOGLE_MAPS_KEY;
      img.src = url;
      $("#static-map").append(img);
    }
    $("#static-map").show();
  }

  private recoverMap() {
    $("map-view").show();
    $("#static-map").hide();
  }

  // TODO(xinbenlv): merge with the same piece of code in image-grid.
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
}