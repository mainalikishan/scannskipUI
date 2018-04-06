import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ServerProvider } from '../../providers/server/server';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { CartPage } from '../cart/cart';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  public scan;
  loading: Loading;
  username = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthServiceProvider,
    private server: ServerProvider,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.auth.getUserInfo().then(user => {
      if (user) {
        this.username = user.name;
      }
    });

    this.scan = this.navParams.get("scan");
    if(this.scan) {
      this.scanBarcode();
    }

  }

  public scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.showLoading();
      this.server.getProductInfo(barcodeData.text).then(data => {
        if(data.length > 0) {
          this.navCtrl.push(CartPage, {
            item: JSON.parse(data)
          });
        } else {
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            title: "NOT FOUND",
            subTitle: "Item not in inventory",
            buttons: ['OK']
          });
          alert.present(prompt);
        }

      });
    }, (err) => {
      alert("This functionality only works in real device!");
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
