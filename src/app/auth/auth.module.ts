import { NgModule }     from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ControlMessagesComponent, ServerErrorMessageComponent } from '../shared/alert.component';

import { ValidationService } from './../shared/validation.service';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule ],
  declarations: [LoginFormComponent, RegisterFormComponent, ControlMessagesComponent, ServerErrorMessageComponent],
  providers: [ValidationService],
  exports: [LoginFormComponent, RegisterFormComponent ]
})
export class AuthModule { }

