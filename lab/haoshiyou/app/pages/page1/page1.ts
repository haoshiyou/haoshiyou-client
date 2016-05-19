import { Page } from 'ionic-angular';
import { ListingService } from '../../listing.service';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [ ListingService ]
})
export class Page1 {
  constructor() {

  }
}
