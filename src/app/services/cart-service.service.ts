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

  /**
    * @description Function to add tickets to the cart.
    * 
    * @param {ItemCart} item_cart Item Cart
    * 
    */
  public addTickets(item_cart: ItemCart) {

    //Empty list => Add New Item
    if (this.listTickets.length == 0) this.listTickets.push(item_cart);

    else {

      const session = (this.listTickets.find(item => item.id == item_cart.id && item.date == item_cart.date));

      if (session) session.tickets = item_cart.tickets; //ID and Date exists => Add tickets
      else this.listTickets.push(item_cart); //ID or Date not exists => Add New Item


    }
    //Emit cart results
    this.emitCart(this.listTickets);

  }

  /**
    * @description Method to delete items of the cart.
    * 
    * @param {ItemCart} item_cart Item Cart
    * 
    */
  public deleteTickets(item_cart: ItemCart) {

    if (item_cart.tickets == 0) {

      const index = this.listTickets.findIndex(item => item.id == item_cart.id && item.date == item_cart.date);
      this.listTickets.splice(index, 1); //Splice element from the array if tickets => 0

    } else {

      const session = (this.listTickets.find(item => item.id == item_cart.id && item.date == item_cart.date));


      if (session) {

        session.tickets = item_cart.tickets; //New value for tickets

      }

    }


    this.emitCart(this.listTickets);

  }

  /**
    * @description Method to emit cart.
    * 
    * @param {ItemCart[]} listTickets Array with all item carts
    * 
    */
  public emitCart(listTickets: ItemCart[]) {

    this.cartSubject.next(listTickets);

  }

}
