import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class NotFoundService {

    constructor(private http: Http) { }

    getStatus() {
        let header = new Headers();
        return this.http.get('http://localhost:3000/api/not-found');
    }
}