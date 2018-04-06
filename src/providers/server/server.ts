import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

/*
  Generated class for the ServerProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {
  apiUrl = 'http://54.85.188.207:3000';
  // http://54.85.188.207:3000/user/product/scan?itemCode=
  // https://api.upcitemdb.com/prod/trial/lookup?upc=

  constructor(public http: HTTP) {
    console.log('Hello ServerProvider Provider');
  }

  public getProductInfo(upcCode) {
    return this.http.get(this.apiUrl + '/user/product/scan?itemCode=' + upcCode + '', {}, {})
      .then(data => {
        console.log(data);
        return data.data;
        // console.log(data.status);
        // console.log(data.data);
        // console.log(data.data); // data received by server
        // // console.log(data.headers);
        // var jData = JSON.parse(data.data);
        // if(jData.items.length>0) {
        //   let alert = this.alertCtrl.create({
        //     title: "Product Name: " + jData.items[0].title,
        //     subTitle: "UPC CODE: " + barcodeData.text,
        //     buttons: ['OK']
        //   });
        //   alert.present(prompt);
        // } else {
        //   let alert = this.alertCtrl.create({
        //     title: "NOT FOUND",
        //     subTitle: "Item not in inventory",
        //     buttons: ['OK']
        //   });
        //   alert.present(prompt);
        // }
        // this.loading.dismiss();

      })
      .catch(error => {
        return error;
        // var jData = JSON.parse(error.error);
        // let alert = this.alertCtrl.create({
        //   title: "NOT FOUND",
        //   subTitle: error.error,
        //   buttons: ['OK']
        // });
        // alert.present(prompt);
        // this.loading.dismiss();
      });
  }
}
