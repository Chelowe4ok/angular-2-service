import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CartService {

    constructor(private http: Http) { }

    addNewOrder(cart) {
        const body = JSON.stringify(cart);

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/api/add-new-order', body, { headers: headers }).map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });;
    }
}