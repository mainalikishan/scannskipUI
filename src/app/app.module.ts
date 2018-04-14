import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CartPage } from '../pages/cart/cart';
import { MainPage } from '../pages/main/main';
import { PaymentPage } from '../pages/payment/payment';
import { CompleteOrderPage } from '../pages/complete-order/complete-order';
import { OrderHistoryPage } from '../pages/order-history/order-history';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HTTP } from '@ionic-native/http';
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

// for social login
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ServerProvider } from '../providers/server/server';
import { UtilityServiceProvider } from '../providers/utility-service/utility-service';

import {CardModule} from 'ngx-card/ngx-card';
import { Stripe } from '@ionic-native/stripe';
import { NgxQRCodeModule } from 'ngx-qrcode3';

var config = {
  apiKey: "AIzaSyBN4NdvyqX3YiKP4KiLAfk3wSJ0PRiHzkA",
  authDomain: "scannskip.firebaseapp.com",
  databaseURL: "https://scannskip.firebaseio.com",
  projectId: "scannskip",
  storageBucket: "scannskip.appspot.com",
  messagingSenderId: "899562347271"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CartPage,
    MainPage,
    PaymentPage,
    CompleteOrderPage,
    OrderHistoryPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireModule.initializeApp(config),
    CardModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CartPage,
    MainPage,
    PaymentPage,
    CompleteOrderPage,
    OrderHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    HttpClientModule,
    Camera,
    BarcodeScanner,
    Keyboard,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    ServerProvider,
    UtilityServiceProvider,
    Stripe
  ]
})
export class AppModule { }
