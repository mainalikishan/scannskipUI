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
      if(barcodeData.cancelled === 0) {
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

}
