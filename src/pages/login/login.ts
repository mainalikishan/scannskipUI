import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, MenuController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { MainPage } from '../main/main';
import { RegisterPage } from '../register/register';
import { ServerProvider } from '../../providers/server/server';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private fire: AngularFireAuth,
    private server: ServerProvider) {
    var that = this;
    this.menuCtrl = menuCtrl;
    this.fire.auth.getRedirectResult().then(function(result) {

      if (result.credential) {
        that.showLoading();
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // ...
        // The signed-in user info.
        var credentials = result.user;
        that.storage.set('isLoggedIn', true);
        that.storage.set('myCart', JSON.stringify({ items: [] })); // cart initilazation
        that.storage.set('isStoreClerk', false);
        if(credentials.email === 'mainalikishan@hotmail.com') {
          that.storage.set('isStoreClerk', true);
        }
        that.storage.set('user',
          '{ "name":"' + credentials.displayName + '", "email":"' + credentials.email + '", "uid":"' + credentials.uid + '" }');

        that.server.sendUserInfo(credentials);
        that.navCtrl.setRoot(MainPage);
        // console.log(result.user);
      }

    }).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
    });

  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public login() {
    var that = this;
    if (this.validation()) {
      this.showLoading();
      this.fire.auth.signInWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
        .then(function(credentials) {
          console.log(credentials);
          that.storage.set('isLoggedIn', true);
          that.storage.set('myCart', JSON.stringify({ items: [] })); // cart initilazation
          that.storage.set('isStoreClerk', false);
          if(credentials.email === 'mainalikishan@hotmail.com') {
            that.storage.set('isStoreClerk', true);
          }
          that.storage.set('user',
            '{ "name":"' + credentials.displayName + '", "email":"' + credentials.email + '", "uid":"' + credentials.uid + '" }');
          that.server.sendUserInfo(credentials);
          that.navCtrl.setRoot(MainPage);
        }).catch(function(error) {
          // Handle Errors here.
          // that.showError(errorMessage);
          that.showPopup('Whoos!', error.message);
        });
    }
  }

  validation() {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.registerCredentials.email))) {
      this.showPopup("Whoops!", "The username and password you entered did not match our records. Please double-check and try again.");
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
      buttons: ['OK']
    });

    alert.present();
    this.loading.dismiss();
  }

  loginWithFacebook() {
    this.showLoading();
    this.fire.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false)
  }

}
