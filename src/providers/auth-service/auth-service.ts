// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(private storage: Storage) { }

  public getUserInfo() {
    return this.storage.get('user').then(user => {
      if (user) {
        return JSON.parse(user);
      }
      return false;
    });
  }

  public logout() {
    return Observable.create(observer => {
      this.storage.set('isLoggedIn', false);
      this.storage.set('user', '');
      observer.next(true);
      observer.complete();
    });
  }

}
