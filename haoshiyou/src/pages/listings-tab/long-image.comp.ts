import {Component, Input} from "@angular/core";
import {File,Transfer} from "ionic-native";
import {Platform} from 'ionic-angular';
import {Listing} from "../../models/listing";

declare let google, document;
declare let QRCode:any;
declare var cordova: any;

@Component({
  selector: 'long-image',
  templateUrl: 'long-image.comp.html'
})
export class LongImageComponent {
  @Input() listing:Listing;
  canvasHeight:number;

  constructor(private platform:Platform) {
    console.log(this.platform.versions());
  }

  public generateLongImage() {
    console.log(" --- generateLongImage... --- ");
    let c: HTMLCanvasElement = document.createElement('canvas');
    c.width = 600;
    let ctx: CanvasRenderingContext2D = c.getContext('2d');
    var title = this.listing.title;
    var description = this.listing.content;
    var despHeight = this.preCalculateHeight(ctx,description,550,25);
    this.canvasHeight = 350 + despHeight + 400; // initial height without images

    var promises = new Array();
    let images = this.preloadElements(promises);
    let imagesHeight = 0;
    Promise.all(promises).then(values => {
        this.resizeCanvas(c, images);
        this.drawElements(c, despHeight, title, description, images);
    });
  }

  private preloadElements(promises) {
    var map_image = new Image();
    var lat = this.listing.lat;
    var lng = this.listing.lng;
    var map_src = 'https://maps.googleapis.com/maps/api/staticmap?&zoom=12&size=598x250&maptype=roadmap&markers=color:red|'
                + lat + ',' + lng + '&key=AIzaSyDilZ69sI7zcszD1XWZ6oeV4IW8rufebMY';
    map_image.crossOrigin = 'Anonymous';
    promises.push(new Promise(function(resolve,reject){
      map_image.onload = function(){
        resolve();
      };
    }));
    map_image.src = map_src;

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

    return {
      map_image: map_image,
      base_images: base_images,
      qrcode_image: qrcode_image
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

  private drawElements(c, despHeight, title, description, images) {
      console.log(" --- What's c1? --- ")
      console.log(c);
      console.log(" --- What's c1? --- ")

      console.log(" --- drawElements... --- ");
      let imageCnt = images.base_images == undefined ? 0 : images.base_images.length;

      let ctx = <CanvasRenderingContext2D> c.getContext('2d');
      ctx.font = "30px Arial";
      ctx.fillText(title, 10, 50);
      ctx.font = "20px Arial";
      this.fillMultiLines(ctx,description,25,80,550,25);

      ctx.drawImage(images.map_image, 0, 100 + despHeight);

      let imageY = 350 + despHeight;
      for (let i = 0; i < imageCnt; i++) {
          ctx.drawImage(images.base_images[i], 0, imageY);
          imageY += images.base_images[i].height;
      }

      var qrcodeY = imageY + 70;
      ctx.drawImage(images.qrcode_image, 150, qrcodeY);

      console.log(" --- Begin to download... --- ");
      var tempImg = document.getElementById('tempImg');
      tempImg.setAttribute('src', c.toDataURL());
      if (this.platform.is('core')) {
        if (navigator.userAgent.indexOf("MSIE") > 0 ||
            navigator.userAgent.match(/Trident.*rv\:11\./))
        {
          var blob = c.msToBlob();
          window.navigator.msSaveBlob(blob, 'haoshiyou-longimage1.png');
        } else {
          var a = document.getElementById("downloadLink");
          a.setAttribute("href", c.toDataURL());
          a.setAttribute("download", "haoshiyou-longimage2.png");
          a.click();
        }
      }
      else { // in cell-phone app
        var imgDataUrl = c.toDataURL();
        // imgData = imgData.substring("data:image/png;base64,".length);
        console.log(' --- imgData ready ---');

        let fileTransfer = new Transfer();
        var targetPath = cordova.file.dataDirectory + "/haoshiyou/" + "current-house.png";
        var options = {};
        fileTransfer.download(imgDataUrl, targetPath, true)
          .then(function(result) {
            // Success!
            console.log("Download");
          }, function(err) {
            // Error
            console.log("Not Download");
          });

        // let fs = cordova.file.dataDirectory;
        // File.writeFile(fs, "longImage_1.png", imgData, {replace: true}
        // ).then(
        //   _ => {console.log(" -- write complete... -- ")}
        // ).catch(
        //   err => {
        //     console.log(" -- file create failed... -- ",err);
        //   }
        // );

        // cordova.plugins.imagesaver.saveImageToGallery(imgData, this.onSaveImageSuccess, this.onSaveImageError);
      }
  }

  // private onSaveImageSuccess() {
  //     console.log('--------------success');
  // }
  //                                             
  // private onSaveImageError() {
  //     console.log('--------------error: ');
  // }

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
