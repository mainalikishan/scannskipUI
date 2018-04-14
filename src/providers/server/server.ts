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

      })
      .catch(error => {
        return error;
      });
  }

  public sendUserInfo(user) {
    console.log("sending user info to server:");
    let data = {
      'uid': user.uid,
      'email': user.email,
      'name': user.name
    };
    let headers = { 'Content-Type': 'application/json' };
    console.log(data);
    this.http.setDataSerializer('json');
    this.http.post(this.apiUrl + '/user/signin', data, headers)
      .then((data) => {
        console.log("Yeppi:");
        console.log(data);
      })
      .catch((error) => {
        console.log("ERROR:");
        console.log(error);
      });
  }

  public makeStripePayment(token, amount, user, cart) {
    console.log("sending card info to server:");
    let data = {
      'token': token,
      'amount': amount,
      'user': JSON.parse( user ),
      'myCart': JSON.parse( cart )
    };
    let headers = { 'Content-Type': 'application/json' };
    console.log(data);
    this.http.setDataSerializer('json');
    return this.http.post(this.apiUrl + '/user/transaction', data, headers)
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        return error;
      });
  }

  public getOrderDetailsByQID(qid) {
    return this.http.get(this.apiUrl + '/user/order?id=' + qid + '', {}, {})
      .then(data => {
        console.log(data);
        return data.data;

      })
      .catch(error => {
        return error;
      });
  }
}
