import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { EventsService } from '../../services/events.service';
import { Observable } from 'rxjs';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-catalog',
	standalone: true,
	imports: [CardComponent, CommonModule],
	templateUrl: './catalog.component.html',
	styleUrl: './catalog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent {

	public events$ = new Observable<Event[]>();

	constructor(private events_service: EventsService) { }

	ngOnInit() {

		//Get all events
		this.events$ = this.events_service.getEvents();

	}

}
