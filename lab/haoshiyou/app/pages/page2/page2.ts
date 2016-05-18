import {Page} from 'ionic-angular';
import { OnInit } from 'angular2/core';

declare let window: any;

@Page({
  templateUrl: 'build/pages/page2/page2.html',
})
export class Page2 implements OnInit {

  constructor() {

  }

  ngOnInit() {
    var div = document.getElementById("map_canvas");

    // Initialize the map view
    let map: any = window.plugin.google.maps.Map.getMap(div);
  }


}