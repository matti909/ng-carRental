import { Component } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  quantity$ = this.shoppingCartSvc.quantityActions$;
  total$ = this.shoppingCartSvc.totalActions$.pipe(startWith(0));
  cart$ = this.shoppingCartSvc.cartActions$;

  constructor(private shoppingCartSvc: ShoppingCartService) {}
}
