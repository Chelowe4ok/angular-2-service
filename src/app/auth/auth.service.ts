import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './../shared/user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    loginUrl = 'http://localhost:3000/api/login';
    registerUlr = 'http://localhost:3000/api/registration';
    isLoggedInUrl = 'http://localhost:3000/api/isloggedin';
    logoutUrl = 'http://localhost:3000/api/logout';

    constructor(private http: Http) { }

    login(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.loginUrl, JSON.stringify(user), options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    register(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.registerUlr, JSON.stringify(user), options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    logout() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.logoutUrl, options).map((res: Response) => res.json())
            .catch(this.handleError);
    }

    isLoggedIn() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.isLoggedInUrl, options)
            .map(function (res: Response) {
                console.log(' Status in service: ' + res.status);
                if (res.json().email) {
                    return res.json();
                } else {
                    return false;
                }
                
            })
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        console.log("res.json: " + res.json());
        let body = res.json();
        return body || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}