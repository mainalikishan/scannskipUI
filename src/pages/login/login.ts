import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading} from 'ionic-angular';
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
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private fire: AngularFireAuth) {

  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.navCtrl.setRoot(MainPage);
      } else {
        this.showError("The username and password you entered did not match our records. Please double-check and try again.");
      }
    },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Invalid!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  loginWithFacebook() {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(
      res => {
        console.log(res);
      })
  }

}
