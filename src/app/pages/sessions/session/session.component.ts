import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

  constructor(private cart_service: CartServiceService) {}

  ngOnInit() {

    this.formatDate();

  }

  public formatDate() {

    const date = new Date(parseInt(this.item.date));

    const formatted_date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    this.item.date = formatted_date;

  }

  public addTicket() {

    if(this.tickets < parseInt(this.item.availability)) {

      this.tickets++;
      
      this.item_cart.id = this.event.id;
      this.item_cart.date = this.item.date;
      this.item_cart.title = this.event.title;
      this.item_cart.tickets = this.tickets;

      this.cart_service.addTickets(this.item_cart);

    } 

  }

  public substractTicket() {

    if(this.tickets > 0) {

      this.tickets--;

      this.item_cart.id = this.event.id;
      this.item_cart.date = this.item.date;
      this.item_cart.title = this.event.title;
      this.item_cart.tickets = this.tickets;

      this.cart_service.deleteTickets(this.item_cart);

    }

  }

}
