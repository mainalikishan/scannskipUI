import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UtilityServiceProvider } from '../../providers/utility-service/utility-service';

import { CartPage } from '../cart/cart';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  loading: Loading;
  username = '';

  constructor(
    private menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private utility: UtilityServiceProvider) {
      this.menuCtrl = menuCtrl;
      this.auth.getUserInfo().then(user => {
        if (user) {
          this.username = user.name;
        }
      });

  }

  public scanBarcode() {
    this.showLoading();
    this.utility.scanBarcode().then(data => {
      if(data != 1) {
        if(data && (data.length > 0)) {
          this.navCtrl.push(CartPage, {
            item: JSON.parse(data)
          });
        } else {
          let alert = this.alertCtrl.create({
            title: "NOT FOUND",
            subTitle: "Item not in inventory",
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
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true)
  }

}
