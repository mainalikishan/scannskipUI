webpackJsonp([5],{

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { HttpClient } from '@angular/common/http';




/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthServiceProvider = (function () {
    function AuthServiceProvider(storage) {
        this.storage = storage;
    }
    AuthServiceProvider.prototype.getUserInfo = function () {
        return this.storage.get('user').then(function (user) {
            if (user) {
                return JSON.parse(user);
            }
            return false;
        });
    };
    AuthServiceProvider.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            _this.storage.set('isLoggedIn', false);
            _this.storage.set('user', '');
            observer.next(true);
            observer.complete();
        });
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_main__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__register_register__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_server_server__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = (function () {
    function LoginPage(storage, navCtrl, menuCtrl, alertCtrl, loadingCtrl, fire, server) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.fire = fire;
        this.server = server;
        this.registerCredentials = { email: '', password: '' };
        var that = this;
        this.menuCtrl = menuCtrl;
        this.fire.auth.getRedirectResult().then(function (result) {
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
                if (credentials.email === 'mainalikishan@hotmail.com') {
                    that.storage.set('isStoreClerk', true);
                }
                that.storage.set('user', '{ "name":"' + credentials.displayName + '", "email":"' + credentials.email + '", "uid":"' + credentials.uid + '" }');
                that.server.sendUserInfo(credentials);
                that.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__main_main__["a" /* MainPage */]);
                // console.log(result.user);
            }
        }).catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
        });
    }
    LoginPage.prototype.createAccount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.login = function () {
        var that = this;
        if (this.validation()) {
            this.showLoading();
            this.fire.auth.signInWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
                .then(function (credentials) {
                console.log(credentials);
                that.storage.set('isLoggedIn', true);
                that.storage.set('myCart', JSON.stringify({ items: [] })); // cart initilazation
                that.storage.set('isStoreClerk', false);
                if (credentials.email === 'mainalikishan@hotmail.com') {
                    that.storage.set('isStoreClerk', true);
                }
                that.storage.set('user', '{ "name":"' + credentials.displayName + '", "email":"' + credentials.email + '", "uid":"' + credentials.uid + '" }');
                that.server.sendUserInfo(credentials);
                that.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__main_main__["a" /* MainPage */]);
            }).catch(function (error) {
                // Handle Errors here.
                // that.showError(errorMessage);
                that.showPopup('Whoos!', error.message);
            });
        }
    };
    LoginPage.prototype.validation = function () {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.registerCredentials.email))) {
            this.showPopup("Whoops!", "The username and password you entered did not match our records. Please double-check and try again.");
            return false;
        }
        return true;
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    LoginPage.prototype.showPopup = function (title, text) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
        this.loading.dismiss();
    };
    LoginPage.prototype.loginWithFacebook = function () {
        this.showLoading();
        this.fire.auth.signInWithRedirect(new __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth.FacebookAuthProvider());
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false);
        this.menuCtrl.swipeEnable(false);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/login/login.html"*/'<ion-content class="login-content" padding>\n  <div class="logo-box">\n    <ion-row>\n      <ion-col></ion-col>\n      <ion-col width-67>\n        <img src="assets/imgs/logo.png" />\n      </ion-col>\n      <ion-col></ion-col>\n    </ion-row>\n    <!-- <h1 class="intro-title">{{ \'{\' }} Scan-N-Skip {{ \'}\' }}</h1> -->\n  </div>\n\n  <div class="login-box animate-in-secondary">\n    <form (ngSubmit)="login()" #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n            <ion-item>\n              <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n            </ion-item>\n\n          </ion-list>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col class="login-col">\n          <button ion-button full type="submit" [disabled]="!registerForm.form.valid" large>Login</button>\n        </ion-col>\n      </ion-row>\n    </form>\n    <ion-row>\n      <ion-col class="signup-col">\n        <button ion-button (click)="loginWithFacebook()" full class="btn-facebook">\n          Login with Facebook\n        </button>\n        <button ion-button class="register-btn" block clear (click)="createAccount()">Need new account? Register</button>\n      </ion-col>\n    </ion-row>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_7__providers_server_server__["a" /* ServerProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_stripe__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_server_server__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utility_service_utility_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__complete_order_complete_order__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PaymentPage = (function () {
    function PaymentPage(storage, navCtrl, navParams, zone, stripe, server, alertCtrl, loadingCtrl, utility) {
        var _this = this;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.stripe = stripe;
        this.server = server;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.utility = utility;
        this.cardInfo = {
            number: '',
            exp: '',
            fname: '',
            lname: '',
            cvc: ''
        };
        this.showToolbar = true;
        // isenabled:boolean = false;
        this.cartName = 'myCart';
        this.objCart = '';
        this.objUser = '';
        this.cartTotalAmt = function () { return 0; };
        this.storage.get(this.cartName).then(function (cart) {
            var objCart = _this.utility._toJSONObject(cart);
            _this.zone.run(function () {
                _this.cartTotalAmt = function () {
                    return objCart.items.reduce(function (acc, item) {
                        return acc + (item.price * item.qty);
                    }, 0);
                };
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
    PaymentPage.prototype.makePayment = function () {
        var _this = this;
        console.log("making payment:");
        this.showLoading();
        this.storage.get('user').then(function (user) {
            _this.storage.get(_this.cartName).then(function (cart) {
                console.log("Cart from DB:");
                var myCart = cart;
                console.log(myCart);
                var exp = _this.cardInfo.exp.split("/");
                var name = _this.cardInfo.fname + " " + _this.cardInfo.lname;
                var card = {
                    number: _this.cardInfo.number,
                    expMonth: exp[0],
                    expYear: exp[1],
                    cvc: _this.cardInfo.cvc,
                    name: name
                };
                _this.stripe.setPublishableKey('pk_test_CAya8Zg6YrTkcUBfgVWcJtbx');
                _this.stripe.createCardToken(card).then(function (token) {
                    _this.server.makeStripePayment(token, _this.cartTotalAmt().toFixed(2), user, myCart).then(function (data) {
                        _this.storage.set(_this.cartName, JSON.stringify({ items: [] }));
                        console.log(data);
                        // let alert = this.alertCtrl.create({
                        //   title: "Success!",
                        //   subTitle: "Your payment has been received",
                        //   buttons: ['OK']
                        // });
                        // alert.present(prompt);
                        // this.navCtrl.push(CompleteOrderPage);
                        if (data && (data.length > 0)) {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__complete_order_complete_order__["a" /* CompleteOrderPage */], {
                                qrid: JSON.parse(data)
                            });
                        }
                        else {
                            var alert_1 = _this.alertCtrl.create({
                                title: "Whoops!",
                                subTitle: "Something went wrong...Please try again later",
                                buttons: ['OK']
                            });
                            alert_1.present(prompt);
                        }
                        // this.navCtrl.setRoot(CompleteOrderPage);
                        _this.loading.dismiss();
                    });
                }).catch(function (error) {
                    console.error(error);
                    var alert = _this.alertCtrl.create({
                        title: "Whoops!",
                        subTitle: error,
                        buttons: ['OK']
                    });
                    alert.present(prompt);
                    _this.loading.dismiss();
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
    };
    PaymentPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    PaymentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PaymentPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], PaymentPage.prototype, "content", void 0);
    PaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-payment',template:/*ion-inline-start:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/payment/payment.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>CHECKOUT</ion-title>\n  </ion-navbar>\n  <ion-toolbar color="primary">\n    <ion-title>\n      <ion-icon name="md-cart"></ion-icon> TOTAL: {{ cartTotalAmt() | currency: \'$\' }}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <div class="card-container"></div>\n  <form card container=".card-container"\n  card-width="385" [messages]="messages" [placeholders]="placeholders" [masks]="any"\n  formatting="true" debug="true" class="checkout" name="paymentForm">\n    <p>\n      <input [(ngModel)]="cardInfo.number" name="number" type="text" class="checkout-input checkout-card" placeholder="Card Number" required card-number/>\n      <input [(ngModel)]="cardInfo.exp" name="exp" type="text" class="checkout-input checkout-exp" placeholder="MM/YY" required card-expiry/>\n    </p>\n    <p>\n      <input [(ngModel)]="cardInfo.fname" name="fname" type="text" class="checkout-input checkout-fname" placeholder="First Name" required card-name/>\n      <input [(ngModel)]="cardInfo.lname" name="lname" type="text" class="checkout-input checkout-lname" placeholder="Last Name" required card-name/>\n\n    </p>\n    <p>\n      <input [(ngModel)]="cardInfo.cvc" name="cvc" type="number" class="checkout-input checkout-cvc" placeholder="CVC/CVC Number" required card-cvc/>\n    </p>\n\n  </form>\n\n</ion-content>\n\n<ion-footer>\n  <button ion-button full icon-right large (click)="makePayment()">\n    COMPLETE ORDER\n    <ion-icon name="arrow-forward"></ion-icon>\n  </button>\n</ion-footer>\n'/*ion-inline-end:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/payment/payment.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_stripe__["a" /* Stripe */],
            __WEBPACK_IMPORTED_MODULE_4__providers_server_server__["a" /* ServerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_utility_service_utility_service__["a" /* UtilityServiceProvider */]])
    ], PaymentPage);
    return PaymentPage;
}());

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleteOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CompleteOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CompleteOrderPage = (function () {
    function CompleteOrderPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.qrData = null;
        this.qrData = navParams.get("qrid");
    }
    CompleteOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompleteOrderPage');
    };
    CompleteOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-complete-order',template:/*ion-inline-start:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/complete-order/complete-order.html"*/'<!--\n  Generated template for the CompleteOrderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Purchase Completed!</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n    <ngx-qrcode [qrc-value]="qrData"></ngx-qrcode>\n    <ion-card-content class="text-center">\n      <p>Show this QR CODE to Cashir/Clerk before leaving the store to complete your transaction.</p>\n      <h2>Purchase Success!</h2>\n      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">\n        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>\n        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>\n      </svg>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/complete-order/complete-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], CompleteOrderPage);
    return CompleteOrderPage;
}());

//# sourceMappingURL=complete-order.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderHistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utility_service_utility_service__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the OrderHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrderHistoryPage = (function () {
    function OrderHistoryPage(navCtrl, navParams, zone, alertCtrl, loadingCtrl, menuCtrl, utility) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.utility = utility;
        this.menuCtrl = menuCtrl;
        this.cartItems = [];
        this.cartTotalAmt = function () { return 0; };
        this.cartTotalQty = function () { return 0; };
    }
    OrderHistoryPage.prototype.scanQrcode = function () {
        var _this = this;
        this.showLoading();
        this.utility.scanQrcode().then(function (data) {
            if (data != 1) {
                if (data && (data.length > 0)) {
                    _this.item = JSON.parse(data);
                    console.log("Order Details:");
                    var items_1 = _this.item.cart.items;
                    _this.zone.run(function () {
                        _this.cartItems = items_1;
                        _this.cartTotalAmt = function () {
                            return items_1.reduce(function (acc, item) {
                                return acc + (item.price * item.qty);
                            }, 0);
                        };
                        _this.cartTotalQty = function () {
                            return items_1.reduce(function (acc, item) {
                                return acc + item.qty;
                            }, 0);
                        };
                    });
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: "NOT FOUND",
                        subTitle: "Order details couldn't be found",
                        buttons: ['OK']
                    });
                    alert_1.present(prompt);
                }
            }
            _this.loading.dismiss();
        });
    };
    OrderHistoryPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    OrderHistoryPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false);
        this.menuCtrl.swipeEnable(false);
    };
    OrderHistoryPage.prototype.ionViewDidLeave = function () {
        this.menuCtrl.enable(true);
        this.menuCtrl.swipeEnable(true);
    };
    OrderHistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderHistoryPage');
    };
    OrderHistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order-history',template:/*ion-inline-start:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/order-history/order-history.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Order Details</ion-title>\n    <ion-buttons end>\n      <button id="cart-btn" ion-button>\n        <ion-icon id="cart-icon" name="md-basket"></ion-icon>\n        <ion-badge id="cart-badge" color="secondary">{{cartTotalQty()}}</ion-badge>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div *ngIf="cartTotalQty() > 0">\n\n    <ion-card *ngFor="let ci of cartItems.slice().reverse()" class="item-remove-animate">\n\n      <img src="{{ci.largeImage}}">\n\n      <ion-item>\n        <h2 class="ellipsis">{{ci.name}}</h2>\n      </ion-item>\n\n      <ion-item>\n        <ion-badge item-left>{{ ci.price | currency: \'$\' }}</ion-badge>\n        <!-- <span item-left></span> -->\n        <span item-left>x {{ci.qty}}</span>\n        <!-- <button ion-button icon-left clear item-end>\n          <ion-icon name="ios-trash-outline"></ion-icon>\n          Delete\n        </button> -->\n        <!-- <button ion-button color="danger" clear icon-only item-end (click)="deleteItemFromCart(ci.upc)">\n          <ion-icon name=\'md-trash\' is-active="false"></ion-icon>\n        </button> -->\n      </ion-item>\n\n    </ion-card>\n\n\n\n  </div>\n  <div *ngIf="cartTotalQty() == 0">\n    <ion-card class="animate-in-secondary">\n      <img src="assets/imgs/scan-2.jpg" />\n      <ion-card-content>\n        <button ion-button block icon-left large (click)="scanQrcode()">\n          <ion-icon name="ios-barcode-outline"></ion-icon>\n          Scan QRCode\n        </button>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n  <!-- <button ion-button full icon-left large>\n    <ion-icon name="md-checkmark-circle-outline"></ion-icon>\n    Approve Purchase\n  </button> -->\n  <ion-toolbar>\n    <ion-title>\n      <ion-icon name="md-cart"></ion-icon> TOTAL: {{ cartTotalAmt() | currency: \'$\' }}</ion-title>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/order-history/order-history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_utility_service_utility_service__["a" /* UtilityServiceProvider */]])
    ], OrderHistoryPage);
    return OrderHistoryPage;
}());

//# sourceMappingURL=order-history.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/cart/cart.module": [
		519,
		4
	],
	"../pages/complete-order/complete-order.module": [
		520,
		3
	],
	"../pages/main/main.module": [
		521,
		2
	],
	"../pages/order-history/order-history.module": [
		522,
		1
	],
	"../pages/payment/payment.module": [
		523,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 213;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.slides = [
            {
                title: "Welcome to SCANnSKIP!",
                description: "Express way of shopping is here :)",
                image: "assets/imgs/login_logo.png",
            },
            {
                title: "What's next?",
                description: "<b>Scan Items</b> as you add them to your cart.",
                image: "assets/imgs/ica-slidebox-img-2.jpg",
            }
        ];
        this.menuCtrl = menuCtrl;
    }
    HomePage.prototype.navigateTologin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false);
        this.menuCtrl.swipeEnable(false);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>SCANnSKIP</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-slides pager>\n    <ion-slide *ngFor="let slide of slides">\n      <img [src]="slide.image" class="slide-image"/>\n      <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n      <p [innerHTML]="slide.description"></p>\n    </ion-slide>\n    <ion-slide>\n      <ion-toolbar>\n      </ion-toolbar>\n      <img src="assets/imgs/ica-slidebox-img-3.png" class="slide-image"/>\n      <h2 class="slide-title">Ready to shop?</h2>\n      <button ion-button large clear icon-end color="primary" (click)="navigateTologin()">\n        Continue\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-slide>\n  </ion-slides>\n  <ion-buttons>\n    <button ion-button icon-left full large (click)="navigateTologin()">\n      <ion-icon name="log-in"></ion-icon>\n      SIGN IN\n    </button>\n  </ion-buttons>\n</ion-content>\n'/*ion-inline-end:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(140);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterPage = (function () {
    function RegisterPage(nav, alertCtrl, menuCtrl, loadingCtrl, fire) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.fire = fire;
        this.createSuccess = false;
        this.registerCredentials = { name: '', email: '', password: '', cpassword: '' };
        this.menuCtrl = menuCtrl;
    }
    RegisterPage.prototype.register = function () {
        var that = this;
        if (this.validation()) {
            this.showLoading();
            this.fire.auth.createUserWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
                .then(function (user) {
                // console.log(user);
                user.updateProfile({
                    displayName: that.registerCredentials.name
                }).then(function () {
                    that.createSuccess = true;
                    that.showPopup("Success", "Account created!");
                }).catch(function (error) {
                    alert(error);
                });
            }).catch(function (error) {
                // var errorCode = error.code;
                var errorMessage = error.message;
                that.showPopup("Whoops!", errorMessage);
                that.loading.dismiss();
                console.log(error);
            });
        }
    };
    RegisterPage.prototype.validation = function () {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.registerCredentials.email))) {
            this.showPopup("Whoops!", "Doesn't look like a valid email. Please double check!");
            return false;
        }
        else if (this.registerCredentials.password !== this.registerCredentials.cpassword) {
            this.showPopup("Whoops!", "Password you entered didn't match. Please double check!");
            return false;
        }
        return true;
    };
    RegisterPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    RegisterPage.prototype.showPopup = function (title, text) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: function (data) {
                        if (_this.createSuccess) {
                            _this.nav.popToRoot();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    RegisterPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false);
        this.menuCtrl.swipeEnable(false);
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/register/register.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content" padding>\n\n  <div class="logo-box">\n    <ion-row>\n      <ion-col></ion-col>\n      <ion-col width-67>\n        <img src="assets/imgs/logo.png" />\n      </ion-col>\n      <ion-col></ion-col>\n    </ion-row>\n    <!-- <h1 class="intro-title">{{ \'{\' }} Scan-N-Skip {{ \'}\' }}</h1> -->\n  </div>\n\n  <div class="login-box animate-in-secondary">\n\n    <form (ngSubmit)="register()" #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n\n            <ion-item>\n              <ion-input type="text" placeholder="Name" name="name" [(ngModel)]="registerCredentials.name" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="Confirm Password" name="cpassword" [(ngModel)]="registerCredentials.cpassword" required></ion-input>\n            </ion-item>\n\n          </ion-list>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid" large>Register</button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(332);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_register_register__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_main_main__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_payment_payment__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_complete_order_complete_order__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_order_history_order_history__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_barcode_scanner__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_http__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_keyboard__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angularfire2_auth__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_auth_service_auth_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_server_server__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_utility_service_utility_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ngx_card_ngx_card__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_stripe__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_ngx_qrcode3__ = __webpack_require__(499);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















// for social login








var config = {
    apiKey: "AIzaSyBN4NdvyqX3YiKP4KiLAfk3wSJ0PRiHzkA",
    authDomain: "scannskip.firebaseapp.com",
    databaseURL: "https://scannskip.firebaseio.com",
    projectId: "scannskip",
    storageBucket: "scannskip.appspot.com",
    messagingSenderId: "899562347271"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_main_main__["a" /* MainPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_complete_order_complete_order__["a" /* CompleteOrderPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_order_history_order_history__["a" /* OrderHistoryPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/cart/cart.module#CartPageModule', name: 'CartPage', segment: 'cart', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/complete-order/complete-order.module#CompleteOrderPageModule', name: 'CompleteOrderPage', segment: 'complete-order', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/main/main.module#MainPageModule', name: 'MainPage', segment: 'main', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-history/order-history.module#OrderHistoryPageModule', name: 'OrderHistoryPage', segment: 'order-history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/payment/payment.module#PaymentPageModule', name: 'PaymentPage', segment: 'payment', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_18__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_21_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_20_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_25_ngx_card_ngx_card__["a" /* CardModule */],
                __WEBPACK_IMPORTED_MODULE_27_ngx_qrcode3__["a" /* NgxQRCodeModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_main_main__["a" /* MainPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_complete_order_complete_order__["a" /* CompleteOrderPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_order_history_order_history__["a" /* OrderHistoryPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_keyboard__["a" /* Keyboard */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_22__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_23__providers_server_server__["a" /* ServerProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_utility_service_utility_service__["a" /* UtilityServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_stripe__["a" /* Stripe */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_main_main__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_order_history_order_history__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, storage, auth) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.auth = auth;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_9__pages_main_main__["a" /* MainPage */] },
            { title: 'Cart', component: __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */] },
            { title: 'Logout', component: null }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.storage.get('isLoggedIn').then(function (isLoggedIn) {
                _this.rootPage = isLoggedIn ? __WEBPACK_IMPORTED_MODULE_9__pages_main_main__["a" /* MainPage */] : __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
                _this.storage.get('isStoreClerk').then(function (isStoreClerk) {
                    console.log(isStoreClerk);
                    _this.rootPage = isStoreClerk ? __WEBPACK_IMPORTED_MODULE_10__pages_order_history_order_history__["a" /* OrderHistoryPage */] : _this.rootPage;
                });
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component) {
            this.nav.setRoot(page.component);
        }
        else {
            // logout logic
            this.auth.logout().subscribe(function (succ) {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilityServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_server_server__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(216);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the UtilityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UtilityServiceProvider = (function () {
    function UtilityServiceProvider(barcodeScanner, server) {
        this.barcodeScanner = barcodeScanner;
        this.server = server;
        console.log('Hello UtilityServiceProvider Provider');
    }
    UtilityServiceProvider.prototype.scanBarcode = function () {
        var _this = this;
        return this.barcodeScanner.scan({
            showTorchButton: true,
            disableSuccessBeep: true
        }).then(function (barcodeData) {
            if (!barcodeData.cancelled) {
                return _this.server.getProductInfo(barcodeData.text).then(function (data) {
                    return data;
                });
            }
            else {
                return barcodeData.cancelled;
            }
        }, function (err) {
            alert("This functionality only works in real device!");
            return false;
        });
    };
    UtilityServiceProvider.prototype.scanQrcode = function () {
        var _this = this;
        return this.barcodeScanner.scan({
            showTorchButton: true,
            disableSuccessBeep: true
        }).then(function (barcodeData) {
            if (!barcodeData.cancelled) {
                return _this.server.getOrderDetailsByQID(barcodeData.text).then(function (data) {
                    return data;
                });
            }
            else {
                return barcodeData.cancelled;
            }
        }, function (err) {
            alert("This functionality only works in real device!");
            return false;
        });
    };
    /* Converts a JSON string to a JavaScript object
     * @param str String the JSON string
     * @returns obj Object the JavaScript object
     */
    UtilityServiceProvider.prototype._toJSONObject = function (str) {
        var obj = JSON.parse(str);
        return obj;
    };
    /* Converts a JavaScript object to a JSON string
     * @param obj Object the JavaScript object
     * @returns str String the JSON string
     */
    UtilityServiceProvider.prototype._toJSONString = function (obj) {
        var str = JSON.stringify(obj);
        return str;
    };
    UtilityServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_1__providers_server_server__["a" /* ServerProvider */]])
    ], UtilityServiceProvider);
    return UtilityServiceProvider;
}());

//# sourceMappingURL=utility-service.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__ = __webpack_require__(214);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
/*
  Generated class for the ServerProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServerProvider = (function () {
    // http://54.85.188.207:3000/user/product/scan?itemCode=
    // https://api.upcitemdb.com/prod/trial/lookup?upc=
    function ServerProvider(http) {
        this.http = http;
        this.apiUrl = 'http://54.85.188.207:3000';
        console.log('Hello ServerProvider Provider');
    }
    ServerProvider.prototype.getProductInfo = function (upcCode) {
        return this.http.get(this.apiUrl + '/user/product/scan?itemCode=' + upcCode + '', {}, {})
            .then(function (data) {
            console.log(data);
            return data.data;
        })
            .catch(function (error) {
            return error;
        });
    };
    ServerProvider.prototype.sendUserInfo = function (user) {
        console.log("sending user info to server:");
        var data = {
            'uid': user.uid,
            'email': user.email,
            'name': user.name
        };
        var headers = { 'Content-Type': 'application/json' };
        console.log(data);
        this.http.setDataSerializer('json');
        this.http.post(this.apiUrl + '/user/signin', data, headers)
            .then(function (data) {
            console.log("Yeppi:");
            console.log(data);
        })
            .catch(function (error) {
            console.log("ERROR:");
            console.log(error);
        });
    };
    ServerProvider.prototype.makeStripePayment = function (token, amount, user, cart) {
        console.log("sending card info to server:");
        var data = {
            'token': token,
            'amount': parseFloat(amount),
            'user': JSON.parse(user),
            'myCart': JSON.parse(cart)
        };
        var headers = { 'Content-Type': 'application/json' };
        console.log(data);
        this.http.setDataSerializer('json');
        return this.http.post(this.apiUrl + '/user/transaction', data, headers)
            .then(function (data) {
            return data.data;
        })
            .catch(function (error) {
            return error;
        });
    };
    ServerProvider.prototype.getOrderDetailsByQID = function (qid) {
        return this.http.get(this.apiUrl + '/user/order?id=' + qid + '', {}, {})
            .then(function (data) {
            console.log(data);
            return data.data;
        })
            .catch(function (error) {
            return error;
        });
    };
    ServerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_http__["a" /* HTTP */]])
    ], ServerProvider);
    return ServerProvider;
}());

//# sourceMappingURL=server.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utility_service_utility_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__payment_payment__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CartPage = (function () {
    function CartPage(storage, navCtrl, navParams, zone, alertCtrl, loadingCtrl, toastCtrl, utility) {
        var _this = this;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.utility = utility;
        this.cartName = 'myCart';
        this.item = navParams.get("item");
        // console.log(this.item);
        this.cartItems = [];
        this.cartTotalAmt = function () { return 0; };
        this.cartTotalQty = function () { return 0; };
        if (typeof this.item == "undefined") {
            this.findAll().then(function (objCart) {
                // console.log("Items in db:");
                // console.log(objCart.items);
                _this.runZone(objCart.items);
            });
        }
        else {
            // console.log("Add to Card:");
            this.addToCart();
        }
    }
    CartPage.prototype.addToCart = function () {
        var _this = this;
        this.findAll().then(function (objCart) {
            var totalQtyInCart = function () {
                return objCart.items.reduce(function (acc, item) {
                    return acc + item.qty;
                }, 0);
            };
            if (totalQtyInCart() < 10) {
                var itemExist = _this.checkIfExistingValue(objCart.items, "upc", _this.item.upc);
                if (!itemExist) {
                    // console.log("Item Not Exist:");
                    _this.item.qty = 1;
                    objCart.items.push(_this.item);
                }
                else {
                    // console.log("Item Exist:");
                    var findItem = _this.findItem(objCart.items, "upc", _this.item.upc);
                    findItem.qty = parseInt(findItem.qty) + 1;
                    var deleteItem = _this.deleteItem(objCart.items, _this.item.upc);
                    if (deleteItem) {
                        _this.item.qty = findItem.qty;
                        objCart.items.push(_this.item);
                    }
                }
                // console.log("Adding to db:");
                // console.log(objCart.items);
                _this.storage.set(_this.cartName, _this.utility._toJSONString(objCart));
            }
            else {
                // console.log("can't add more than 10 items");
                var toast = _this.toastCtrl.create({
                    message: 'You are not supposed to add more than 10 quantity of items!',
                    showCloseButton: true,
                    closeButtonText: 'OK'
                });
                toast.onDidDismiss(function () {
                    // console.log('Dismissed toast');
                });
                toast.present();
            }
            _this.runZone(objCart.items);
        });
    };
    CartPage.prototype.deleteItemFromCart = function (upcCode) {
        var _this = this;
        // console.log("???:");
        // console.log(this.cartItems);
        // console.log("???:");
        // console.log(upcCode);
        var alert = this.alertCtrl.create({
            title: 'Confirm Delete!',
            message: 'Are you sure to remove this item from cart?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        var deleteItem = _this.deleteItem(_this.cartItems, upcCode);
                        if (deleteItem) {
                            _this.findAll().then(function (objCart) {
                                // console.log("Removing item from cart:");
                                // console.log(this.cartItems);
                                objCart.items = _this.cartItems;
                                _this.storage.set(_this.cartName, _this.utility._toJSONString(objCart));
                                _this.runZone(objCart.items);
                                var toast = _this.toastCtrl.create({
                                    message: 'Item was removed from your cart!',
                                    duration: 3000
                                });
                                toast.onDidDismiss(function () {
                                    // console.log('Dismissed toast');
                                });
                                toast.present();
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.runZone = function (items) {
        var _this = this;
        this.zone.run(function () {
            _this.cartItems = items;
            _this.cartTotalAmt = function () {
                return items.reduce(function (acc, item) {
                    return acc + (item.price * item.qty);
                }, 0);
            };
            _this.cartTotalQty = function () {
                return items.reduce(function (acc, item) {
                    return acc + item.qty;
                }, 0);
            };
        });
    };
    CartPage.prototype.scanBarcode = function () {
        var _this = this;
        this.showLoading();
        this.utility.scanBarcode().then(function (data) {
            if (data != 1) {
                if (data && (data.length > 0)) {
                    _this.item = JSON.parse(data);
                    _this.addToCart();
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: "NOT FOUND",
                        subTitle: "Item not in inventory",
                        buttons: ['OK']
                    });
                    alert_1.present(prompt);
                }
            }
            _this.loading.dismiss();
        });
    };
    CartPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    CartPage.prototype.checkOut = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__payment_payment__["a" /* PaymentPage */]);
    };
    CartPage.prototype.checkIfExistingValue = function (obj, key, value) {
        return obj.some(function (item) {
            return item.upc === value;
        });
    };
    CartPage.prototype.findAll = function () {
        var _this = this;
        return this.storage.get(this.cartName).then(function (cart) {
            return _this.utility._toJSONObject(cart);
        });
    };
    CartPage.prototype.findItem = function (obj, key, value) {
        return obj.find(function (v) { return v[key] === value; });
    };
    CartPage.prototype.deleteItem = function (obj, value) {
        return obj.some(function (item) {
            if (item.upc === value)
                return obj.splice(obj.indexOf(item), 1);
        });
    };
    CartPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CartPage');
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart',template:/*ion-inline-start:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/cart/cart.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Cart</ion-title>\n    <ion-buttons end>\n      <button id="cart-btn" ion-button>\n        <ion-icon id="cart-icon" name="md-basket"></ion-icon>\n        <ion-badge id="cart-badge" color="secondary">{{cartTotalQty()}}</ion-badge>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div *ngIf="cartTotalQty() > 0">\n    <button *ngIf="cartTotalQty() < 10" (click)="checkOut()" ion-button block icon-left large>\n      <ion-icon name="md-checkmark-circle-outline"></ion-icon>\n      CHECKOUT\n    </button>\n\n    <ion-card *ngFor="let ci of cartItems.slice().reverse()" class="item-remove-animate">\n\n      <img src="{{ci.largeImage}}">\n\n      <ion-item>\n        <h2 class="ellipsis">{{ci.name}}</h2>\n      </ion-item>\n\n      <ion-item>\n        <ion-badge item-left>{{ ci.price | currency: \'$\' }}</ion-badge>\n        <!-- <span item-left></span> -->\n        <span item-left>x {{ci.qty}}</span>\n        <!-- <button ion-button icon-left clear item-end>\n          <ion-icon name="ios-trash-outline"></ion-icon>\n          Delete\n        </button> -->\n        <button ion-button color="danger" clear icon-only item-end (click)="deleteItemFromCart(ci.upc)">\n          <ion-icon name=\'md-trash\' is-active="false"></ion-icon>\n        </button>\n      </ion-item>\n\n    </ion-card>\n\n\n\n  </div>\n  <div *ngIf="cartTotalQty() == 0">\n    <ion-card class="animate-in-secondary">\n      <img src="assets/imgs/empty_cart.png" />\n      <ion-card-content>\n        <button ion-button block icon-left large (click)="scanBarcode()">\n          <ion-icon name="ios-barcode-outline"></ion-icon>\n          Start Shopping\n        </button>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n  <button *ngIf="cartTotalQty() > 0 && cartTotalQty() < 10" ion-button full icon-left large (click)="scanBarcode()">\n    <!-- <ion-icon name="md-barcode"></ion-icon> -->\n    Contine Shopping\n  </button>\n  <button *ngIf="cartTotalQty() == 10" (click)="checkOut()" ion-button full icon-left large>\n    <ion-icon name="md-checkmark-circle-outline"></ion-icon>\n    CHECKOUT\n  </button>\n  <ion-toolbar>\n    <ion-title>\n      <ion-icon name="md-cart"></ion-icon> TOTAL: {{ cartTotalAmt() | currency: \'$\' }}</ion-title>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/cart/cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utility_service_utility_service__["a" /* UtilityServiceProvider */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utility_service_utility_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MainPage = (function () {
    function MainPage(menuCtrl, navCtrl, navParams, auth, alertCtrl, loadingCtrl, utility) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.utility = utility;
        this.username = '';
        this.menuCtrl = menuCtrl;
        this.auth.getUserInfo().then(function (user) {
            if (user) {
                _this.username = user.name;
            }
        });
    }
    MainPage.prototype.scanBarcode = function () {
        var _this = this;
        this.showLoading();
        this.utility.scanBarcode().then(function (data) {
            if (data != 1) {
                if (data && (data.length > 0)) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */], {
                        item: JSON.parse(data)
                    });
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: "NOT FOUND",
                        subTitle: "Item not in inventory",
                        buttons: ['OK']
                    });
                    alert_1.present(prompt);
                }
            }
            _this.loading.dismiss();
        });
    };
    MainPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    MainPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(true);
        this.menuCtrl.swipeEnable(true);
    };
    MainPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-main',template:/*ion-inline-start:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/main/main.html"*/'<ion-header>\n  <ion-navbar [hideBackButton]="true">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Welcome, {{username}}!</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <!-- <img src="assets/imgs/scan-1.jpg" class="slide-image"/> -->\n  <ion-card class="animate-in-secondary">\n  <img src="assets/imgs/scan-1.jpg"/>\n  <ion-item>\n    <ion-icon name="clock" item-start large></ion-icon>\n    <h2>Save Time</h2>\n    <p>Scan your item yourself</p>\n  </ion-item>\n\n  <ion-item>\n    <ion-icon name="contacts" item-left large ></ion-icon>\n    <h2>Skip the Line</h2>\n    <p>No need to wait behind long queue</p>\n  </ion-item>\n\n  <ion-item>\n    <ion-icon name="card" item-left large ></ion-icon>\n    <h2>Go cashless</h2>\n    <p>Pay online - leave cash home</p>\n  </ion-item>\n</ion-card>\n</ion-content>\n\n<ion-footer>\n  <button ion-button icon-left full (click)="scanBarcode()" large>\n     Scan Barcode\n  </button>\n</ion-footer>\n'/*ion-inline-end:"/Users/mainalikishan/School/FINALSEM/CS595/Client/scannskipUI/src/pages/main/main.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utility_service_utility_service__["a" /* UtilityServiceProvider */]])
    ], MainPage);
    return MainPage;
}());

//# sourceMappingURL=main.js.map

/***/ })

},[310]);
//# sourceMappingURL=main.js.map