import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { NotFoundService } from './not-found.service';

import { NotFoundComponent } from './not-found.component';
import { HomeComponent } from './../home.component/home.component';
import { AddNewOrderComponent } from '../add-new-order/add-new-order.component';
import { AuthComponent } from '../auth/auth.component';
import { UserComponent, UserResolve } from '../user/user.component';



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
    { path: 'not-found', component: NotFoundComponent },
    
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [BrowserModule, HttpModule, RouterModule.forChild(routes)],
    declarations: [NotFoundComponent],
    providers: [NotFoundService],
    bootstrap: [NotFoundComponent]
})
export class NotFoundModule { }