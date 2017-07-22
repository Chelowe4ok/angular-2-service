import { Input, Component } from '@angular/core';
import { CartService } from './cart.service';
//routs
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    providers: []
})
export class CartComponent {
    @Input() queue: number;
    isIFrame: boolean;

    constructor(private router: Router, private cartService: CartService) { }

    generateCart(): Array<number> {
        let cartUsers = new Array(this.queue);
        return cartUsers;
    }

    addNewOrder(cart: number) {

        this.cartService.addNewOrder(cart).subscribe((data) => { this.isIFrame = data.isIFrame; this.router.navigate(['/add-new-order']); });;
    }
}