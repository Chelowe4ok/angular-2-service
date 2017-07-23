import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, JsonpModule } from '@angular/http';
import { NotFoundModule } from './not-found.component/not-found.module';
import { AuthModule } from './auth/auth.module';
import { AddNewOrderModule } from './add-new-order/add-new-order.module';


//routs
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent, ServerErrorMessageComponent } from './shared/alert.component';

//components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component/not-found.component';
import { HomeComponent, ScrollDown } from './home.component/home.component';
import { QueueComponent } from './home.component/queue/queue.component';
import { CartComponent } from './home.component/queue/cart/cart.component';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { AuthComponent } from './auth/auth.component';
import { UserResolve, UserComponent } from './user/user.component';

//services
import { CartService } from './home.component/queue/cart/cart.service';
import { UserService } from './user/user.service';
import { AddNewOrderService } from './add-new-order/add-new-order.service';
import { ValidationService } from './shared/validation.service';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-new-order', component: AddNewOrderComponent },
    { path: 'login', component: AuthComponent },
    { path: 'registration', component: AuthComponent },
    {
        path: 'information',
        component: UserComponent,
        resolve: {
            dataUser: UserResolve
        }
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, NotFoundModule, FormsModule, ReactiveFormsModule, AuthModule, AddNewOrderModule, RouterModule.forRoot(routes) ],
    declarations: [UserComponent, AppComponent, HomeComponent, ScrollDown, QueueComponent, CartComponent, AddNewOrderComponent, AuthComponent],
    providers: [CartService, UserService, UserResolve, AddNewOrderService, ValidationService],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

