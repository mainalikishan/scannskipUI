import { Injectable } from '@angular/core';
import { ServerProvider } from '../../providers/server/server';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/*
  Generated class for the UtilityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityServiceProvider {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private server: ServerProvider) {
    console.log('Hello UtilityServiceProvider Provider');
  }

  public scanBarcode() {
    return this.barcodeScanner.scan({
          showTorchButton : true,
          disableSuccessBeep: true
      }).then((barcodeData) => {
      if(!barcodeData.cancelled) {
        return this.server.getProductInfo(barcodeData.text).then(data => {
          return data;
        });
      } else {
        return barcodeData.cancelled;
      }
    }, (err) => {
      alert("This functionality only works in real device!");
      return false;
    });
  }

  public scanQrcode() {
    return this.barcodeScanner.scan({
          showTorchButton : true,
          disableSuccessBeep: true
      }).then((barcodeData) => {
      if(!barcodeData.cancelled) {
        return this.server.getOrderDetailsByQID(barcodeData.text).then(data => {
          return data;
        });
      } else {
        return barcodeData.cancelled;
      }
    }, (err) => {
      alert("This functionality only works in real device!");
      return false;
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

}
