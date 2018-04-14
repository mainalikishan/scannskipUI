import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompleteOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complete-order',
  templateUrl: 'complete-order.html',
})
export class CompleteOrderPage {
  qrData = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.qrData = navParams.get("qrid");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteOrderPage');
  }

}
