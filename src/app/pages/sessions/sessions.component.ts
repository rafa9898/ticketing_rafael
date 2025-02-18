import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SessionsService } from '../../services/sessions.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Session } from '../../interfaces/session';
import { Event } from '../../interfaces/event';
import { SessionComponent } from './session/session.component';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule, SessionComponent, CartComponent, RouterLink],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionsComponent {

  public sessions_id: string | null = "";
  public sessions$: Observable<Session[]> = new Observable<Session[]>();
  public pageError: boolean = false;
  public event: Event = {

    id: '',
    title: '',
    subtitle: '',
    image: ''

  }

  constructor(private activatedRoute: ActivatedRoute, private sessions_service: SessionsService, private cdr: ChangeDetectorRef){}

  ngOnInit() {

    this.sessions_id = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.sessions_id != null) {

      this.sessions$ = this.sessions_service.getSession(this.sessions_id);

      this.sessions$ = this.sessions$.pipe(
        map(sessions => sessions.sort((a: Session, b: Session) =>
              (new Date(parseInt(a.date))).getTime() - (new Date(parseInt(b.date))).getTime()
        )));

      this.sessions$.subscribe(() => {}, error => { console.log(error); this.pageError = true; this.cdr.detectChanges()})
      this.sessions_service.getDataSession(this.sessions_id).subscribe((event: Event) => this.event = event);

    } 

  }

}
