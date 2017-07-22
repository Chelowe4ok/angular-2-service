
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from './../../shared/user';
import { AuthService } from './../auth.service';
import { ValidationService } from './../../shared/validation.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['login-form.component.css']
})
export class LoginFormComponent {

    @Output() onToggle = new EventEmitter<boolean>();
    @Output() onClose = new EventEmitter<string>();

    user: User;
    toggles = false;
    loginForm: any;
    serverErrorMessageEmail: string;
    serverErrorMessagePassword: string;
    statusEmail: boolean;
    statusPassword: boolean;

    constructor(private authService: AuthService, public fb: FormBuilder, private router: Router) {
        this.loginForm = this.fb.group({
            'email': ['', [Validators.required, ValidationService.emailValidator]],
            'password': ['', [Validators.required, ValidationService.passwordValidator]]
        });
    }

    login(event) {
        console.log(this.loginForm.value);
        this.user = new User(this.loginForm.value.email, this.loginForm.value.password);
        let self = this;
        this.authService.login(this.user).subscribe(
            function (data) {
                if (data.warningEmail) {
                    self.serverErrorMessageEmail = data.warningEmail;
                    self.statusEmail = true;
                }

                if (data.warningPassword) {
                    self.serverErrorMessagePassword = data.warningPassword;
                    self.statusPassword = true;
                }

                if (data.redirect) {
                    self.onClose.emit('loggedIn');
                }

            },
            (error) => { console.log(error)}
        );
    }

    onKeyEmail(event: any) {
        this.statusEmail = false;
    }

    onKeyPassword(event: any) {
        this.statusPassword = false;
    }

    toggle(agreed: boolean) {
        this.onToggle.emit(agreed);
        this.toggles = true;
    }

    close() {
        this.onClose.emit();
    }
}