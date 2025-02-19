import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from '../../../../interfaces/event';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-card',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class CardComponent {

	@Input() item: Event = {

		id: "",
		title: "",
		subtitle: "",
		image: "",
		place: "",
		startDate: "",
		endDate: "",
		description: ""

	};

	ngOnInit() {

		this.formatStartDate();

		this.formatEndDate();

	}

	/**
	     * @description Function to format start date.
	     * 
	     * 
	     */
	public formatStartDate() {

		if (this.item.startDate != undefined) {

			const date = new Date(parseInt(this.item.startDate));

			const formatted_date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

			this.item.startDate = formatted_date;

		}

	}

	/**
	     * @description Function to format end date.
	     * 
	     * 
	     */
	public formatEndDate() {

		if (this.item.endDate != undefined) {

			const date = new Date(parseInt(this.item.endDate));

			const formatted_date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

			this.item.endDate = formatted_date;

		}

	}

}
