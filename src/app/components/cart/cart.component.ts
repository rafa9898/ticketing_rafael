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

    //Get cart info
    this.cart$ = this.cart_service.cart$;

    this.cart$.subscribe((cart: ItemCart[]) => {

      this.cart = cart;

    })

  }

  /**
    * @description Method to delete sessions.
    * 
    * @param {string} id ID we want to delete
    * @param {string} date Date we want to delete
    * 
    */
  public deleteSessions(id: string, date: string) {

    //Find item cart with this id and date
    const item_cart = this.cart.find(item => item.id == id && item.date == date);

    if(item_cart) {

      item_cart.tickets--; //Remove 1 ticket
      this.cart_service.deleteTickets(item_cart); //Update cart

    }
    
  }
  

}
