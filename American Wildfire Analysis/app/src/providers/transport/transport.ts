import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Rx";
import { Mixpanel } from '@ionic-native/mixpanel';


@Injectable()
export class TransportProvider {

  BASE_URL = "https://wfa-server.herokuapp.com/"


  constructor(private http: Http, private mixpanel: Mixpanel) {
    
  }

  get(endpoint: string) {
    let headers = new Headers({
      'Content-Type': "application/json"
    });
    let options = new RequestOptions({
      headers: headers
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.BASE_URL + endpoint, options).toPromise().then(data => {
        resolve(data["_body"])
      }).catch(error => {
        reject(error)
      });
    });
  }

  post(endpoint: string, data) {
    let body = data
    let headers = new Headers({
      'Content-Type': "application/json"
    });
    let options = new RequestOptions({
      headers: headers
    });

    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL + endpoint, body, options).toPromise().then(response => {
        resolve(response["_body"])
      }).catch(error => {
        reject(error)
      })
    })
  }
}
