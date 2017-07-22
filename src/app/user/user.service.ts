import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './../shared/user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    userPage = 'http://localhost:3000/api/information';

    constructor(private http: Http) { }

    getUserInfo() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.userPage, options)
            .map(function (res: Response) {
                console.log('user service - res status: ' + res.status);
                if (res.status >= 200 && res.status <= 300) {
                    return res.json();
                } else {
                    return false;
                }
                
            })
            .catch(this.handleError);
    }

    getUserInfoPromise() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let self = this;
    
        return new Promise((resolve, reject) => {
            this.http.get(this.userPage).map(res => res.json()).catch(function (error: any): any {
                console.log('reject: ' + error);
                if (error.status == 401) {
                    console.log('401');
                    return Observable.throw( '401 - Unauthorized');
                } else {
                    return Observable.throw(error.json().error || 'Server error');
                }
            }).subscribe((callResult) => {
                console.log("Promiser resolve: " + callResult);
                for (let name in callResult) {
                    console.log(name + ': ' + callResult[name]);
                }

                let user = new User(callResult.email, callResult.password);
                resolve(user);
            });

        });

    }

    private extractData(res: Response) {
        console.log("res.json: " + res.json());
        let body = res.json();
        return new Observable(body) || new Observable();
    }
    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            return Observable.throw(errMsg);
        } else {
            errMsg = error.message ? error.message : error.toString();
            console.error(errMsg);
            return Observable.throw(errMsg);
        }
    }
}