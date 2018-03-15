import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loading: Loading;
  createSuccess = false;
  registerCredentials = { name: '', email: '', password: '', cpassword: '' };

  constructor(
    private nav: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private fire: AngularFireAuth) {
  }

  public register() {
    var that = this;
    if (this.validation()) {
      this.showLoading();
      this.fire.auth.createUserWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
        .then(function(user) {
          // console.log(user);
          user.updateProfile({
            displayName: that.registerCredentials.name
          }).then(function() {
            that.showPopup("Success", "Account created!");
          }).catch(function(error) {
            alert(error);
          });
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          that.showPopup("Whoops!", errorMessage);
          that.loading.dismiss();
          console.log(error);
        });
    }

  }

  validation() {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.registerCredentials.email))) {
      this.showPopup("Whoops!", "Doesn't look like a valid email. Please double check!");
      return false;
    } else if (this.registerCredentials.password !== this.registerCredentials.cpassword) {
      this.showPopup("Whoops!", "Password you entered didn't match. Please double check!");
      return false;
    }
    return true;
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
