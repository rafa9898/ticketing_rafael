import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCart } from '../../interfaces/item-cart';
import { CartServiceService } from '../../services/cart-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  public cart$: Observable<ItemCart[]> = new Observable<ItemCart[]>();
  public cart: ItemCart[] = [];

  constructor(private cart_service: CartServiceService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {

    this.cart$ = this.cart_service.cart$;

    this.cart$.subscribe((cart: ItemCart[]) => {

      this.cart = cart;

    })

  }

  public deleteSessions(id: string, date: string) {

    const item_cart = this.cart.find(item => item.id == id && item.date == date);

    if(item_cart) {

      item_cart.tickets--;
      this.cart_service.deleteTickets(item_cart);

    }
    
  }
  

}
