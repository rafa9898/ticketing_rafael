import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCart } from '../../interfaces/item-cart';
import { CartServiceService } from '../../services/cart-service.service';
import { CommonModule } from '@angular/common';
import { GroupedCart } from '../../interfaces/grouped-cart';

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
	public grouped_cart: GroupedCart[] = [];

	constructor(private cart_service: CartServiceService, private cdr: ChangeDetectorRef) {

	}

	ngOnInit() {

		//Get cart info
		this.cart$ = this.cart_service.cart$;

		this.cart$.subscribe((cart: ItemCart[]) => {

			this.cart = cart;
			this.grouped_cart = this.groupSessionsByName();

			this.cdr.detectChanges();

		})

	}

	//Method to group sessions by name
	public groupSessionsByName() {

		const groupedMap = this.cart.reduce((map, { title, ...option }) => {
			if (!map.has(title)) {
				map.set(title, [])
			}
			map.get(title).push(option)
			return map
		}, new Map())

		const groupedSessions = Array.from(groupedMap, ([label, options]) => ({
			label,
			options
		}));

		return groupedSessions;

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

		if (item_cart) {

			item_cart.tickets--; //Remove 1 ticket
			this.cart_service.deleteTickets(item_cart); //Update cart

		}

	}


}
