import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Stripe } from '@ionic-native/stripe';
import { ServerProvider } from '../../providers/server/server';
import { UtilityServiceProvider } from '../../providers/utility-service/utility-service';

import { CompleteOrderPage } from '../complete-order/complete-order';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  @ViewChild(Content) content: Content;
  loading: Loading;
  cardInfo: any = {
    number: '',
    exp: '',
    fname: '',
    lname: '',
    cvc: ''
  }
  showToolbar: boolean = true;
  // isenabled:boolean = false;
  cartName = 'myCart';
  objCart: any = '';
  objUser: any = '';
  cartTotalAmt: any;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private zone: NgZone,
    private stripe: Stripe,
    private server: ServerProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private utility: UtilityServiceProvider) {
      this.cartTotalAmt = function() { return 0; }
      this.storage.get( this.cartName ).then(cart => {
        let objCart = this.utility._toJSONObject( cart );
        this.zone.run(() => {
          this.cartTotalAmt = function() {
              return objCart.items.reduce(function(acc, item) {
                  return acc + (item.price * item.qty);
              }, 0);
          }
        });
      });
    // this.keyboard.onKeyboardShow().subscribe(data => {
    //    console.log('keyboard is shown');
    //    this.zone.run(() => {
    //      this.showToolbar = false;
    //    });
    //    this.content.resize();
    // });
    // this.keyboard.onKeyboardHide().subscribe(data => {
    //    console.log('keyboard is hidden');
    //    this.zone.run(() => {
    //      this.showToolbar = true;
    //    });
    //    this.content.resize();
    // });
  }

  public makePayment() {
    console.log("making payment:");
    this.showLoading();
    this.storage.get( 'user' ).then(user => {
      this.storage.get( this.cartName ).then(cart => {
        console.log("Cart from DB:");
        let myCart = cart;
        console.log(myCart);
        let exp = this.cardInfo.exp.split("/");
        let name = this.cardInfo.fname+" "+this.cardInfo.lname;
        let card = {
         number: this.cardInfo.number,
         expMonth: exp[0],
         expYear: exp[1],
         cvc: this.cardInfo.cvc,
         name: name
        };
        this.stripe.setPublishableKey('pk_test_CAya8Zg6YrTkcUBfgVWcJtbx');
        this.stripe.createCardToken(card).then((token) => {
          this.server.makeStripePayment(token, this.cartTotalAmt().toFixed(2), user, myCart).then(data => {
            this.storage.set(this.cartName, JSON.stringify({ items: [] }));
            console.log(data);
            // let alert = this.alertCtrl.create({
            //   title: "Success!",
            //   subTitle: "Your payment has been received",
            //   buttons: ['OK']
            // });
            // alert.present(prompt);
            // this.navCtrl.push(CompleteOrderPage);
            if(data && (data.length > 0)) {
              this.navCtrl.setRoot(CompleteOrderPage, {
                qrid: JSON.parse(data)
              });
            } else {
              let alert = this.alertCtrl.create({
                title: "Whoops!",
                subTitle: "Something went wrong...Please try again later",
                buttons: ['OK']
              });
              alert.present(prompt);
            }

            // this.navCtrl.setRoot(CompleteOrderPage);
            this.loading.dismiss();
          });
        }).catch(error => {
          console.error(error);
          let alert = this.alertCtrl.create({
            title: "Whoops!",
            subTitle: error,
            buttons: ['OK']
          });
          alert.present(prompt);
          this.loading.dismiss();
        });
      });
    });
    // let exp = this.cardInfo.exp.split("/");
    // let name = this.cardInfo.fname+" "+this.cardInfo.lname;
    // let card = {
    //  number: this.cardInfo.number,
    //  expMonth: exp[0],
    //  expYear: exp[1],
    //  cvc: this.cardInfo.cvc,
    //  name: name
    // };
    // this.stripe.setPublishableKey('pk_test_CAya8Zg6YrTkcUBfgVWcJtbx');
    // this.stripe.createCardToken(card).then((token) => {
    //   this.server.makeStripePayment(token, 10);
    // }).catch(error => console.error(error));
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}
