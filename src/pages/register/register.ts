import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loading: Loading;
  createSuccess = false;
  registerCredentials = { name: '', email: '', phone: '', password: '' };

  constructor(
    private nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private fire: AngularFireAuth) {
    }

  public register() {
    this.showLoading();
    var that = this;
    this.fire.auth.createUserWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      that.showPopup("Fail", errorMessage);
      that.loading.dismiss();
      console.log(error);
    });
    // this.auth.register(this.registerCredentials).subscribe(success => {
    //   if (success) {
    //     this.createSuccess = true;
    //     this.showPopup("Success", "Account created.");
    //   } else {
    //     this.showPopup("Error", "Problem creating account.");
    //   }
    //   this.loading.dismiss();
    // },
    //   error => {
    //     this.showPopup("Error", error);
    //   });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
