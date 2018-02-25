import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CartPage } from '../pages/cart/cart';
import { ListPage } from '../pages/list/list';
import { MainPage } from '../pages/main/main';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// for social login
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

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
    CartPage,
    ListPage,
    MainPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CartPage,
    ListPage,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider
  ]
})
export class AppModule { }
