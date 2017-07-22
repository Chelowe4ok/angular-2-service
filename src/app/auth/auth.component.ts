import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    providers: [AuthService]
})
export class AuthComponent implements OnInit {
    toggle = false;

    constructor(private _router:Router, private authService: AuthService){}

    onToggle(agreed: boolean) {
        this.toggle = !this.toggle;
    }

    ngOnInit() {
        let currentUrl = this._router.url; /// this will give you current url
        if (currentUrl == '/login') {
            this.toggle = false;
        } else if (currentUrl == '/registration') {
            this.toggle = true;
        }
    }

}