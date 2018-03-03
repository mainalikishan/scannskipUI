import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { MainPage } from '../main/main';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  constructor(
    public navCtrl: NavController,
    private auth: AuthServiceProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private fire: AngularFireAuth) {
    var that = this;
    this.fire.auth.getRedirectResult().then(function(result) {

      if (result.credential) {
        that.showLoading();
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // ...
        // The signed-in user info.
        that.auth.login(result.user).subscribe(allowed => {
          if (allowed) {
            that.navCtrl.setRoot(MainPage);
          } else {
            that.showToast('bottom', "The username and password you entered did not match our records. Please double-check and try again.");
          }
        });
        console.log(result.user);
      }

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });

  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public login() {
    var that = this;
    this.showLoading();
    this.fire.auth.signInWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
    .then(function(credentials) {
      console.log(credentials);
      that.auth.login(credentials).subscribe(allowed => {
        if (allowed) {
          that.navCtrl.setRoot(MainPage);
        } else {
          that.showToast('bottom', "The username and password you entered did not match our records. Please double-check and try again.");
        }
      },
        error => {
          this.showError(error);
        });
    }).catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      // that.showError(errorMessage);
      that.showToast('bottom', 'The username and password you entered did not match our records. Please double-check and try again.');
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'OK',
      position: position
    });

    toast.present(toast);
    this.loading.dismiss();
  }

  loginWithFacebook() {
    this.showLoading();
    this.fire.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

}
