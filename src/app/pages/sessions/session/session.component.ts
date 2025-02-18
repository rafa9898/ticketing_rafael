import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Session } from '../../../interfaces/session';
import { FormsModule } from '@angular/forms';
import { CartServiceService } from '../../../services/cart-service.service';
import { Event } from '../../../interfaces/event';
import { ItemCart } from '../../../interfaces/item-cart';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class SessionComponent {

  public item_cart: ItemCart = { date: '', tickets: 0, title: '', id: '' }

  @Input() item: Session = {

    availability: '',
    date: ''

  };

  @Input() event: Event = {

    id: '',
    title: '',
    subtitle: '',
    image: ''

  };

  public tickets: number = 0;

  constructor(private cart_service: CartServiceService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {

    this.formatDate();

    //Listening changes of the cart to update tickets
    this.cart_service.cart$.subscribe((response: ItemCart[]) => {

      const item = response.find(item => item.date == this.item.date);

      if(item) this.tickets = item.tickets;
      else this.tickets = 0;

      //Detect changes
      this.cdr.detectChanges();

    })

  }

  /**
	 * @description Function to format date.
	 * 
	 * 
	 */
  public formatDate() {

    const date = new Date(parseInt(this.item.date));

    const formatted_date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    this.item.date = formatted_date;

  }

  /**
	 * @description Function add tickets to the cart.
	 * 
	 * 
	 */
  public addTicket() {

    if(this.tickets < parseInt(this.item.availability)) {

      this.tickets++;
      
      this.item_cart.id = this.event.id;
      this.item_cart.date = this.item.date;
      this.item_cart.title = this.event.title;
      this.item_cart.tickets = this.tickets;

      //Adding to the cart
      this.cart_service.addTickets(this.item_cart);

    } 

  }

  /**
	 * @description Function delete tickets from the cart.
	 * 
	 * 
	 */
  public substractTicket() {

    if(this.tickets > 0) {

      this.tickets--;

      this.item_cart.id = this.event.id;
      this.item_cart.date = this.item.date;
      this.item_cart.title = this.event.title;
      this.item_cart.tickets = this.tickets;

      //Deleting from the cart
      this.cart_service.deleteTickets(this.item_cart);

    }

  }

}
