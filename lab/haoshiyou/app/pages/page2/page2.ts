import {Page} from 'ionic-angular';
import { OnInit } from 'angular2/core';
import { Listing } from '../../listing';
declare let window: any;

@Page({
  templateUrl: 'build/pages/page2/page2.html',
})
export class Page2 implements OnInit {

  constructor() {

  }

  ngOnInit() {
    var div = document.getElementById('map_canvas');
    const GOOGLE_CAMPUS_CENTER = new window.plugin.google.maps.LatLng(37.41666, -122.09106);
    // Initialize the map view
    let map: any = window.plugin.google.maps.Map.getMap(div, {
      'backgroundColor': 'white',
      'mapType': window.plugin.google.maps.MapTypeId.NORMAL,
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': false,
        'rotate': false,
        'zoom': true
      },
      'camera': {
        'latLng': GOOGLE_CAMPUS_CENTER,
        'zoom': 8,
      }
    });
  }
}

