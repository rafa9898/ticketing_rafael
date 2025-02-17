import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCart } from '../../interfaces/item-cart';
import { CartServiceService } from '../../services/cart-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  public cart$: Observable<ItemCart[]> = new Observable<ItemCart[]>();

  constructor(private cart_service: CartServiceService){}

  ngOnInit() {

    this.cart$ = this.cart_service.cart$;

  }

}
