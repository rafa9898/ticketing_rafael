import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionsService } from '../../services/sessions.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Session } from '../../interfaces/session';
import { Event } from '../../interfaces/event';
import { SessionComponent } from './session/session.component';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule, SessionComponent, CartComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {

  public sessions_id: string | null = "";
  public sessions$: Observable<Session[]> = new Observable<Session[]>();
  public event: Event = {

    id: '',
    title: '',
    subtitle: '',
    image: ''

  }

  constructor(private activatedRoute: ActivatedRoute, private sessions_service: SessionsService){}

  ngOnInit() {

    this.sessions_id = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.sessions_id != null) {

      this.sessions$ = this.sessions_service.getSession(this.sessions_id);
      this.sessions_service.getDataSession(this.sessions_id).subscribe((event: Event) => this.event = event);

    }

  }

}
