import {Component, OnChanges, Input, SimpleChange} from "@angular/core";
import {Listing} from "../../models/listing";
@Component({
  selector: 'map-view',
  templateUrl: 'map-view.comp.html'
})
export class MapViewComponent implements OnChanges {
  @Input() listings:Listing[];

  ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
    if (changes['listings']) {
      this.render();
    }
  }

  private render() {
  }


}
