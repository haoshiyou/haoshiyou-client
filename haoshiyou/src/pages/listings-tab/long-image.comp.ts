import {Component, Input} from "@angular/core";
import {Platform} from 'ionic-angular';
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
declare let google, document;
declare let QRCode:any;
declare var cordova: any;

@Component({
  selector: 'long-image',
  templateUrl: 'long-image.comp.html'
})
export class LongImageComponent {
  @Input() listing:HsyListing;
  canvasWidth:number;
  canvasHeight:number;
  private fileTransfer:TransferObject;
  constructor(private platform:Platform, private transfer: Transfer) {
    this.canvasWidth = 600;
    console.log(this.platform.versions());
    this.fileTransfer = this.transfer.create();
  }

  public generateLongImage() {
    console.log(" --- generateLongImage... --- ");
    let c: HTMLCanvasElement = document.createElement('canvas');
    c.width = this.canvasWidth;
    let ctx: CanvasRenderingContext2D = c.getContext('2d');
    var title = this.listing.title;
    var description = this.listing.content;
    var despHeight = this.preCalculateHeight(ctx,description,550,25);
    var qrcodeHeight = 400;
    this.canvasHeight = 100 + despHeight + qrcodeHeight; // title + description
    if (this.hasLocation()) {
      this.canvasHeight += 250;
    }

    var promises = new Array();
    let images = this.preloadElements(promises);
    let imagesHeight = 0;
    Promise.all(promises).then(values => {
        this.resizeCanvas(c, images);
        this.drawElements(c, despHeight, title, description, images);
    });
  }

  private preloadElements(promises) {
    var map_image = null;
    if (this.hasLocation()) {
      map_image = new Image();
      var lat = this.listing.location.lat;
      var lng = this.listing.location.lng;
      var map_size = '598x250'
      var map_src = 'https://maps.googleapis.com/maps/api/staticmap?&zoom=12&size='
                  + map_size + '&maptype=roadmap&markers=color:red|'
                  + lat + ',' + lng + '&key=AIzaSyDilZ69sI7zcszD1XWZ6oeV4IW8rufebMY';
      map_image.crossOrigin = 'Anonymous';
      promises.push(new Promise(function(resolve,reject){
        map_image.onload = function(){
          resolve();
        };
      }));
      map_image.src = map_src;
    }

    var qrcenter_image = new Image();
    var qrcenter_src = '/assets/res/favicon/apple-touch-icon-72x72.png'
    qrcenter_image.crossOrigin = 'Anonymous';
    promises.push(new Promise(function(resolve,reject){
      qrcenter_image.onload = function(){
        resolve();
      };
    }));
    qrcenter_image.src = qrcenter_src;

    var imageCnt = this.listing.imageIds === undefined ? 0 : this.listing.imageIds.length;
    let base_images = new Array(imageCnt);
    for (let i = 0; i < imageCnt; i++) {
        base_images[i] = new Image();
        base_images[i].crossOrigin = 'Anonymous';
        base_images[i].src = 'http://res.cloudinary.com/xinbenlv/image/upload/q_70,w_600/' + this.listing.imageIds[i];
        promises.push(new Promise(function(resolve,reject){
          base_images[i].onload = function() {
            resolve();
          };
        }));
    }

    let qrcode_image: HTMLImageElement = this.getQrcodeImage(document.location.href);

    /*
    var goto_image = new Image();
    var goto_src = '/assets/res/long-image/haoshiyou-goto.png'
    goto_image.crossOrigin = 'Anonymous';
    promises.push(new Promise(function(resolve,reject){
      goto_image.onload = function(){
        resolve();
      };
    }));
    goto_image.src = goto_src;
    */

    return {
      map_image: map_image,
      base_images: base_images,
      qrcode_image: qrcode_image,
      qrcenter_image: qrcenter_image
      // goto_image: goto_image
    }
  }

  private resizeCanvas(c, images) {
    let imageCnt = images.base_images == undefined ? 0 : images.base_images.length;
    let imagesHeight = 0;
    for (let i = 0; i < imageCnt; i++) {
      imagesHeight += images.base_images[i].height;
    }
    c.height = this.canvasHeight + imagesHeight;
  }

  private hasLocation() {
    return this.listing.location != undefined && this.listing.location.lat != 0;
  }

  private drawElements(c, despHeight, title, description, images) {
      console.log(" --- drawElements... --- ");
      let imageCnt = images.base_images == undefined ? 0 : images.base_images.length;

      let ctx = <CanvasRenderingContext2D> c.getContext('2d');
      ctx.fillStyle = "black";
      ctx.font = "30px Arial";
      ctx.fillText(title, 10, 50);
      ctx.font = "20px Arial";
      this.fillMultiLines(ctx,description,25,80,550,25);
      
      let imageY = 100 + despHeight;
      if (this.hasLocation()) {
        ctx.drawImage(images.map_image, 0, imageY);
        imageY += 250;
      }

      for (let i = 0; i < imageCnt; i++) {
          ctx.drawImage(images.base_images[i], 0, imageY);
          imageY += images.base_images[i].height;
      }

      var qrcodeY = imageY + 70;
      ctx.drawImage(images.qrcode_image, 170, qrcodeY);
      ctx.drawImage(images.qrcenter_image, (this.canvasWidth-72)/2, qrcodeY + 95);

      var qrcodeHintY = qrcodeY - 20;
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      var gotoY = qrcodeY + 300;
      ctx.fillText('扫描二维码查看详情，可私信po主', 160, qrcodeHintY);
      ctx.fillStyle = "black";
      ctx.font = "30px Arial";
      ctx.fillText('更多咨询请查看haoshiyou.org', 100, gotoY);
      // ctx.drawImage(images.goto_image, 6, gotoY);

      // draw boundaries
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0,0,this.canvasWidth,c.height);//for white background
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 2;
      ctx.strokeStyle="#000000";
      ctx.strokeRect(0,0,this.canvasWidth,c.height);//for white background

      console.log(" --- Begin to download... --- ");
      let fileName = 'haoshiyou-' + (new Date(this.listing.lastUpdated)).toISOString() + '.png';
      if (this.platform.is('core')) {
        if (navigator.userAgent.indexOf("MSIE") > 0 ||
            navigator.userAgent.match(/Trident.*rv\:11\./))
        {
          var blob = c.msToBlob();
          window.navigator.msSaveBlob(blob, fileName);
        } else {
          var a = document.getElementById("downloadLink");
          a.setAttribute("href", c.toDataURL());
          a.setAttribute("download", fileName);
          a.click();
        }
      }
      else { // in cell-phone app
        var imgDataUrl = c.toDataURL();
        var targetPath = cordova.file.dataDirectory + "/haoshiyou/" + fileName;
        var options = {};
        this.fileTransfer.download(imgDataUrl, targetPath, true)
          .then(function(result) {
            // Success!
            console.log("Download");
          }, function(err) {
            // Error
            console.log("Not Download");
          });
      }
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
