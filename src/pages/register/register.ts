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
  registerCredentials = { name: '', email: '', phone: '', password: '' };

  constructor(
    private nav: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private fire: AngularFireAuth) {
  }

  public register() {
    this.showLoading();
    var that = this;
    this.fire.auth.createUserWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
      .then(function(user) {
        // var user = this.fire.auth.currentUser;
        console.log(user);
        user.updateProfile({
          displayName: that.registerCredentials.name
        }).then(function() {
          that.showPopup("Success", "Account created!");
        }).catch(function(error) {
          alert(error);
        });
        // that.showPopup("Success", "Account created.");
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        that.showPopup("Invalid!", errorMessage);
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
