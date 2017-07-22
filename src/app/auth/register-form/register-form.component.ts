
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { User } from './../../shared/user';
import { ValidationService } from './../../shared/validation.service';

@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

    @Output() onToggle = new EventEmitter<boolean>();
    @Output() onClose = new EventEmitter<boolean>();

    toggles = true;
    user: User;
    registerForm: any;
    serverErrorMessage: string;
    status: boolean;

    constructor(private authService: AuthService, public fb: FormBuilder, private router: Router) {
        this.registerForm = this.fb.group({
            'email': ['', [Validators.required, ValidationService.emailValidator]],
            'password': ['', [Validators.required, ValidationService.passwordValidator]]
        });
    }

    register(event) {
        this.user = new User(this.registerForm.value.email, this.registerForm.value.password);
        let self = this;
        this.authService.register(this.user)
            .subscribe(function (data) {
                if (data.warning) {
                    console.log(data.warning);
                    self.status = true;
                    self.serverErrorMessage = data.warning;
                    
                } else if (data.redirect) {
                    self.toggle(true);
                }
            },
            error => console.log(<any>error));
    }

    onKeyEmail(event: any) {
        this.status = false;
    }

    toggle(agreed: boolean) {
        this.onToggle.emit(agreed);
        this.toggles = false;
    }

    close() {
        this.onClose.emit();
    }

}