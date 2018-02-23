import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  slides = [
    {
      title: "Welcome to Scan N Skip!",
      description: "Skip the line; save time",
      image: "assets/imgs/ica-slidebox-img-1.png",
    },
    {
      title: "What's next?",
      description: "<b>Scan Items</b> as you add them to your cart.",
      image: "assets/imgs/ica-slidebox-img-2.png",
    }
  ];

}
