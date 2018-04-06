import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  slides = [
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

  navigateTologin() {
    this.navCtrl.setRoot(LoginPage);
  }

}
