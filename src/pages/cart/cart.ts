import { Component, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { MainPage } from '../main/main';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  private item;
  public cartItems: any ;
  public cartTotalAmt;
  public cartTotalQty;
  cartName = 'myCart';

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private zone: NgZone,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
      this.item = navParams.get("item");
      // console.log(this.item);
      this.cartItems = [];
      this.cartTotalAmt = function() { return 0; }
      this.cartTotalQty = function() { return 0; }
      if(typeof this.item == "undefined") {
        this.findAll().then(objCart => {
          console.log("Items in db:");
          console.log(objCart.items);
          this.runZone(objCart.items);
        });
      } else {
        console.log("Add to Card:");
        this.addToCart();
      }
  }

  public addToCart() {
    if(this.cartTotalQty() < 10) {
      this.findAll().then(objCart => {
        var itemExist = this.checkIfExistingValue(objCart.items, "upc", this.item.upc);
        if(!itemExist) {
          console.log("Item Not Exist:");
          this.item.qty = 1;
          objCart.items.push( this.item );
        } else {
          console.log("Item Exist:");
          var findItem = this.findItem(objCart.items, "upc", this.item.upc);
          findItem.qty  += parseInt(findItem.qty);
          var deleteItem = this.deleteItem(objCart.items, this.item.upc);
          if(deleteItem) {
            this.item.qty = findItem.qty;
            objCart.items.push( this.item );
          }
        }
        console.log("Adding to db:");
        console.log(objCart.items);
        this.storage.set( this.cartName, this._toJSONString( objCart ) );
        this.runZone(objCart.items);
      });
    } else {
      console.log("can't add more than 10 items");
    }
  }

  public deleteItemFromCart(upcCode) {
    console.log("???:");
    console.log(this.cartItems);
    console.log("???:");
    console.log(upcCode);
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete!',
      message: 'Are to sure to remove this item from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            var deleteItem = this.deleteItem(this.cartItems, upcCode);
            if(deleteItem) {
              this.findAll().then(objCart => {
                console.log("Removing item from cart:");
                console.log(this.cartItems);
                objCart.items = this.cartItems;
                this.storage.set( this.cartName, this._toJSONString( objCart ) );
                this.runZone(objCart.items);
                let toast = this.toastCtrl.create({
                  message: 'Item was removed from your cart!',
                  duration: 3000
                });

                toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
                });

                toast.present();
              });
            }
          }
        }
      ]
    });
    alert.present();

  }

  runZone(items) {
    this.zone.run(() => {
        this.cartItems = items;
        this.cartTotalAmt = function() {
            return items.reduce(function(acc, item) {
                return acc + (item.price * item.qty);
            }, 0);
        }
        this.cartTotalQty = function() {
            return items.reduce(function(acc, item) {
                return acc + (item.qty);
            }, 0);
        }
    });
  }

  checkIfExistingValue(obj, key, value) {
    return obj.some(function (item) {
      return item.upc === value;
    });
  }

  findAll() {
    return this.storage.get( this.cartName ).then(cart => {
      return this._toJSONObject( cart );
    });
  }

  findItem(obj, key, value) {
    return obj.find(function(v){ return v[key] === value});
  }

  deleteItem(obj, value) {
    return obj.some(item => {
    if(item.upc === value) // Case sensitive, will only remove first instance
      return obj.splice(obj.indexOf(item),1);
    })
  }

  scanBarcode() {
    this.navCtrl.push(MainPage, {
      scan: true
    });
  }

  /* Converts a JSON string to a JavaScript object
   * @param str String the JSON string
   * @returns obj Object the JavaScript object
   */

  _toJSONObject ( str ) {
      var obj = JSON.parse( str );
      return obj;
  }

  /* Converts a JavaScript object to a JSON string
   * @param obj Object the JavaScript object
   * @returns str String the JSON string
   */

  _toJSONString ( obj ) {
      var str = JSON.stringify( obj );
      return str;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
