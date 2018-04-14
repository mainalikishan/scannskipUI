import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { UtilityServiceProvider } from '../../providers/utility-service/utility-service';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {
  loading: Loading;
  private item;
  public cartItems: any;
  public cartTotalAmt;
  public cartTotalQty;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private zone: NgZone,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private utility: UtilityServiceProvider) {
    this.menuCtrl = menuCtrl;
    this.cartItems = [];
    this.cartTotalAmt = function() { return 0; }
    this.cartTotalQty = function() { return 0; }
  }

  public scanQrcode() {
    this.showLoading();
    this.utility.scanQrcode().then(data => {
      if (data != 1) {
        if (data && (data.length > 0)) {
          this.item = JSON.parse(data);
          console.log("Order Details:");
          let items = this.item.cart.items;
          this.zone.run(() => {
            this.cartItems = items;
            this.cartTotalAmt = function() {
              return items.reduce(function(acc, item) {
                return acc + (item.price * item.qty);
              }, 0);
            }
            this.cartTotalQty = function() {
              return items.reduce(function(acc, item) {
                return acc + item.qty;
              }, 0);
            }
          });
        } else {
          let alert = this.alertCtrl.create({
            title: "NOT FOUND",
            subTitle: "Order details couldn't be found",
            buttons: ['OK']
          });
          alert.present(prompt);
        }
      }
      this.loading.dismiss();
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false)
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
  }

}
