import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  username = '';
  email = '';
  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    private auth: AuthServiceProvider,
    private barcodeScanner: BarcodeScanner) {
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
  }

  public scanBarcode() {
    this.platform.ready().then(() => {

      this.barcodeScanner.scan().then((barcodeData) => {
        // Success! Barcode data is here
        console.log(barcodeData);
        alert("UPC CODE: " + barcodeData.text);
      }, (err) => {
        // An error occurred
        alert("This functionality only works in emulator or real device!");
      });
   });
  }

  public logout() {
  this.auth.logout().subscribe(succ => {
    this.navCtrl.setRoot(LoginPage)
  });
}

}
