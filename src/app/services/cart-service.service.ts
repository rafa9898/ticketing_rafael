import { Injectable } from '@angular/core';
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

    if(this.listTickets.length == 0) this.listTickets.push(item_cart);

    else {

      if(this.listTickets.find(item => item.id != item_cart.id)) this.listTickets.push(item_cart);
      else if(this.listTickets.find(item => item.id == item_cart.id && item.date != item_cart.date)) this.listTickets.push(item_cart);
      else {

        this.listTickets.forEach((item: ItemCart) => {

          item.tickets = item_cart.tickets;

        })

      }

    }

    console.log(this.listTickets);

    this.emitCart(this.listTickets);

  }

  public emitCart(listTickets: ItemCart[]) {

    this.cartSubject.next(listTickets);

  }

}
