import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HTTP } from '@ionic-native/http';
// import { HttpClient } from '@angular/common/http';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  loading: Loading;
  product: Observable<any>;

  username = '';
  email = '';

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    private auth: AuthServiceProvider,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private nativeHttp: HTTP) {
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
  }

  public scanBarcode() {
    this.platform.ready().then(() => {
      this.barcodeScanner.scan().then((barcodeData) => {
        this.showLoading();
        // Success! Barcode data is here
        // console.log(barcodeData);

        // var apiKey = '95wrbfpc4hxp7dfmnqsm6ntg';
        this.nativeHttp.get('https://api.upcitemdb.com/prod/trial/lookup?upc=' + barcodeData.text + '', {}, {})
          .then(data => {
            console.log(data.status);
            console.log(data.data); // data received by server
            // console.log(data.headers);
            var jData = JSON.parse(data.data);
            if(jData.items.length>0) {
              let alert = this.alertCtrl.create({
                title: "Product Name: " + jData.items[0].title,
                subTitle: "UPC CODE: " + barcodeData.text,
                buttons: ['OK']
              });
              alert.present(prompt);
            } else {
              let alert = this.alertCtrl.create({
                title: "NOT FOUND",
                subTitle: "Item not in inventory",
                buttons: ['OK']
              });
              alert.present(prompt);
            }
            this.loading.dismiss();

          })
          .catch(error => {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
            var jData = JSON.parse(error.error);
            let alert = this.alertCtrl.create({
              title: "NOT FOUND",
              subTitle: jData.message,
              buttons: ['OK']
            });
            alert.present(prompt);
            this.loading.dismiss();
          });

        // this.product
        //   .subscribe(data => {
        //     console.log('my data: ', data);
        //   })
        // alert("Product name: " + this.product['items']['name']);
      }, (err) => {
        // An error occurred
        alert("This functionality only works in emulator or real device!");
      });
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

}
