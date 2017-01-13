import {NavParams, NavController} from "ionic-angular";
import {Listing} from "../../models/listing";
import {IThreadService} from "../../services/chats/thread.service";
import {Thread, User} from "../../models/models";
import {IUserService} from "../../services/chats/user.service";
import {ChatWindowPage} from "../chats-tab/chat-window.page";
import {Component, AfterViewInit, OnInit} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {IImageService} from "../../services/image.service";
import {IListingService} from "../../services/listings/listing.service";
declare let window:any;
declare let QRCode:any;

@Component({
  selector: 'listing-detail',
  templateUrl: 'listing-detail.page.html'
})
export class ListingDetailPage implements AfterViewInit {
  listing:Listing;
  owner:User;
  meId:string;
  public loading:boolean = true;
  ngAfterViewInit():void {

    console.log("XXX ngAfterViewInit");
  // TODO(xinbenlv): add back later
  //   console.log("XXX generateQrCode code");
  //   this.generateQrCode();
  }
  ngOnInit():void {
    console.log("XXX ListingDetailPage load 2");
    if (this.params.data['listing'] != null) {
      console.log(`XXXX param = ${JSON.stringify(this.params)}`);
      this.listing = this.params.data.listing;
      this.params.data.id = this.listing.id;
      this.initListeners();
      this.loading = false;
    } else {
      let id = this.params.data.id;
      this.listingService.getListingById(id).then((listing) => {
        this.listing = listing;
        this.initListeners();
        this.loading = false;

        console.log("XXX Finish loading");
      });
    }
  }

  generateQrCode(link:string = "http://haoshiyou.org"):any {
    var el = document.getElementById('qrcode');

    // Clear existing children inside of the qrcode div.
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    var qrcode = new QRCode(el);
    qrcode.makeCode(link);
  }

  constructor(private threadService:IThreadService,
              private userService:IUserService,
              private listingService:IListingService,
              private nav:NavController,
              private params:NavParams,
              private imageService:IImageService) {

  }

  edit() {
    this.nav.push(CreationPage, {listing: this.listing});
  }

  private initListeners() {
    this.userService.observableUserById(this.listing.ownerId).subscribe((owner:User)=> {
      this.owner = owner;
    });
    this.userService.promiseMe().then((me:User)=> {
      if (me) {
        this.meId = me.id;
      }
    });
    this.userService.observableMeId().subscribe((meId:string)=> {
      this.meId = meId;
    });
  }
  startChat() {
    // TODO(xinbenlv): handle when not yet logged in.
    let thread:Thread = <Thread>{};
    this.userService.promiseMe().then((me:User)=> {
      let newThreadId:string = me.id + '|' + this.listing.id;
      thread.id = newThreadId;
      thread.userIds = [me.id, this.listing.ownerId];
      return this.threadService.createThread(thread);
    }).then(() => {
      this.nav.push(ChatWindowPage, {thread: thread});
    });
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

  generateLongImage() {
    var c = <HTMLCanvasElement> document.createElement('canvas');
    c.width = 600;
    var ctx = <CanvasRenderingContext2D> c.getContext('2d');
    var title = this.listing.title;
    var description = this.listing.content;
    var despHeight = this.preCalculateHeight(ctx,description,550,25)
    var lat = this.listing.lat;
    var lng = this.listing.lng;
    var imageCnt = this.listing.imageIds === undefined ? 0 : this.listing.imageIds.length;
    var canvasHeight = 350 + despHeight + 400 * imageCnt + 400;
    c.height = canvasHeight;
    var promises = new Array();

    ctx.font = "30px Arial";
    ctx.fillText(title, 10, 50);
    ctx.font = "20px Arial";
    this.fillMultiLines(ctx,description,25,80,550,25)

    var map_image = new Image();
    var map_src = 'https://maps.googleapis.com/maps/api/staticmap?&zoom=12&size=598x250&maptype=roadmap&markers=color:red|'
                + lat + ',' + lng + '&key=AIzaSyDilZ69sI7zcszD1XWZ6oeV4IW8rufebMY';
    map_image.crossOrigin = 'Anonymous';
    promises.push(new Promise(function(resolve,reject){
      map_image.onload = function(){
        resolve();
      };
    }));
    map_image.src = map_src;
    
    let base_images = new Array(imageCnt);
    for (let i = 0; i < imageCnt; i++) {
        base_images[i] = new Image();
        base_images[i].crossOrigin = 'Anonymous';
        base_images[i].src = 'http://res.cloudinary.com/xinbenlv/image/upload/q_70,w_600/' + this.listing.imageIds[i];
        promises.push(new Promise(function(resolve,reject){
          base_images[i].onload = function(){
            resolve();
          };
        }));
    }

    // promises.push(new Promise(function(resolve,reject){
          var qrcode_image = <HTMLImageElement> this.getQrcodeImage('http://haoshiyou.org');
    //       resolve();
    // }));

    // download image
    Promise.all(promises).then(values => {
      ctx.drawImage(map_image, 0, 100 + despHeight);
      let imageY = 350 + despHeight;
      for (let i = 0; i < imageCnt; i++) {
          if (i > 0) { imageY += 400; }
          console.log(i + "th imageY: " + imageY);
          ctx.drawImage(base_images[i], 0, imageY);
      }
      var qrcodeY = 430 + despHeight + 400 * imageCnt;
      ctx.drawImage(qrcode_image, 150, qrcodeY);

      if (navigator.userAgent.indexOf("MSIE") > 0 ||
          navigator.userAgent.match(/Trident.*rv\:11\./))
      {
        var blob = c.msToBlob();
        window.navigator.msSaveBlob(blob, 'test_file1.png');
      } else {
        var a = document.getElementById("downloadLink");
        console.log(" --- " + a + " --- ");
        a.setAttribute("href", c.toDataURL());
        a.setAttribute("download", "test_file2.png");
        a.click();
      }
    });
  }

  private getQrcodeImage(link) {
    var el = document.createElement('div');
    el.style.margin = "20%";
    var qrcode = new QRCode(el);
    qrcode.makeCode(link);
    return el.firstChild;
  }


  private preCalculateHeight(context, text, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    var lines = 0;
    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines++;
      }
    }
    return lines * lineHeight; // height
  }

  private fillMultiLines(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    var lines = 0;
    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
        lines++;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
}
