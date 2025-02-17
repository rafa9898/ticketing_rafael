import { EventEmitter, Injectable } from '@angular/core';
import { ItemCart } from '../interfaces/item-cart';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  public listTickets: ItemCart[] = [];
  public cartSubject = new BehaviorSubject<ItemCart[]>(this.listTickets);
  public cart$: Observable<ItemCart[]> = this.cartSubject.asObservable();

  constructor() { }

  public addTickets(item_cart: ItemCart) {

    if (this.listTickets.length == 0) this.listTickets.push(item_cart);

    else {

      const session = (this.listTickets.find(item => item.id == item_cart.id && item.date == item_cart.date));

      if (session) session.tickets = item_cart.tickets;
      else this.listTickets.push(item_cart);


    }

    this.emitCart(this.listTickets);

  }

  public deleteTickets(item_cart: ItemCart) {

    if (item_cart.tickets == 0) {

      const index = this.listTickets.findIndex(item => item.id == item_cart.id && item.date == item_cart.date);
      this.listTickets.splice(index, 1);

    } else {

      const session = (this.listTickets.find(item => item.id == item_cart.id && item.date == item_cart.date));


      if (session) {

        session.tickets = item_cart.tickets;

      }

    }


    this.emitCart(this.listTickets);

  }

  public emitCart(listTickets: ItemCart[]) {

    this.cartSubject.next(listTickets);

    localStorage.setItem('cart', JSON.stringify(listTickets));

  }

}
