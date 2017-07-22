import { Component, Directive, ElementRef, Input, HostListener} from '@angular/core';
import { AuthService } from '../auth/auth.service';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [AuthService],
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    toggle = false;
    authModal = false;
    loggedIn = false;
    scrollState: boolean;

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
        this.scrollState = !this.scrollState;
    }
}

@Directive({
    selector: '[scroll-down]'
})
export class ScrollDown {
    constructor(private el: ElementRef) { }

    @HostListener("click", ['$event']) onScrollDownClick(event: Event) {
        this.scrollDown(event);
    }

    private scrollDown(event) {
        let transitionToElement = this.el.nativeElement.getAttribute('data-href');
        console.log('transitionToElement: ' + transitionToElement);
    }
}
