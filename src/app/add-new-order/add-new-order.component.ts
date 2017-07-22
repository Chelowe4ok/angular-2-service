import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AddNewOrderService } from './add-new-order.service';
import { ValidationService } from './../shared/validation.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'add-new-order',
    templateUrl: 'add-new-order.component.html',
    styleUrls: ['add-new-order.component.css']
})
export class AddNewOrderComponent {
    serverErrorMessage: string;
    status: boolean;
    addNewProductForm: any;

    constructor(private domSan: DomSanitizer, public fb: FormBuilder, private addNewOrderService: AddNewOrderService) {
        this.addNewProductForm = this.fb.group({
            'url': ['', [Validators.required, ValidationService.urlValidator]],
        });
    }

    addNewProduct(event) {      
        console.log('scrdoc' + ' : ' + event);
    }

    checkout(event) {

    }

    getUrl() {
        return this.domSan.bypassSecurityTrustResourceUrl('http://ua.sportsdirect.com/');
    }
}
