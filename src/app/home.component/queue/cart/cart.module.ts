import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CartComponent } from './cart.component';



const routes: Routes = [
    { path: 'add-new-order', component: CartComponent }
];

@NgModule({
    imports: [BrowserModule, HttpModule, RouterModule.forChild(routes)],
    declarations: [CartComponent],
    providers: [],
    bootstrap: [CartComponent]
})
export class CartModule { }