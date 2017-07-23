import { Component, Directive, ElementRef, Input, HostListener, Inject} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DOCUMENT } from '@angular/platform-browser';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [AuthService],
    styleUrls: ['./home.component.css'],
    animations: [
        trigger('scrollState', [
            state('inactive', style({
                transform: 'rotateY(0deg)',
                opacity: 1
            })),
            state('active', style({
                transform: 'rotateY(180deg)',
                opacity: 0
            })),
            transition('inactive => active', animate('1000ms ease-in')),
            transition('active => inactive', animate('1000ms ease-out'))
        ])
    ]
})
export class HomeComponent {
    toggle = false;
    authModal = false;
    loggedIn = false;
    scrollState: string = 'inactive';

    constructor(private authService: AuthService) {
        let self = this;
        this.authService.isLoggedIn()
            .subscribe(function (data) {
                if (data) {
                    console.log(data.id);
                    self.loggedIn = true;
                } else {
                    self.loggedIn = false;
                }
            },
            error => console.log(<any>error));
    }

    onToggle(agreed: boolean) {
        this.toggle = !this.toggle;
    }

    auth(event) {
        let target = event.target || event.srcElement || event.currentTarget;
        if (target.id == 'registration') {
            this.toggle = true;
            this.authModal = true;
        } else if (target.id == 'login') {
            this.toggle = false;
            this.authModal = true;
        }
    }

    logout() {
        let self = this;
        this.authService.logout().subscribe(function (data) {
            if (data) {
                self.loggedIn = false;
            }
        },
        error => console.log(<any>error));
    }

    close(value) {
        if ('loggedIn') {
            this.loggedIn = true;
        }
        this.authModal = false;
    }

    scroll() {
        this.scrollState = this.scrollState == 'inactive' ? 'active' : 'inactive';
    }
}

@Directive({
    selector: '[scroll-down]'
})
export class ScrollDown {

    
    constructor( @Inject(DOCUMENT) private document: Document, private el: ElementRef) { }

    @HostListener("click", ['$event']) onScrollDownClick(event: Event) {
        this.scrollDown(event);
    }
    private scrollDown(event) {
        let transitionToElement = this.el.nativeElement.getAttribute('data-href');
        console.log('transitionToElement: ' + transitionToElement);
        console.log('top: ' + this.el.nativeElement.offsetTop);
        console.log('window innerHeight: ' + window.innerHeight);

        this.smoothScroll(window.innerHeight)
    }

    private smoothScroll(positionStop) {
        let startY = 0;
        let stopY = positionStop;
        let distance = stopY > startY ? stopY - startY : startY - stopY;

        if (distance < 100) {
            scrollTo(0, stopY); return;
        }

        let speed = Math.round(distance / 100);
        if (speed >= 40) speed = 40;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;

        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }

        for (let i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }
}
