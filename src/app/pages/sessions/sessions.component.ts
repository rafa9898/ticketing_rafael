import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionsService } from '../../services/sessions.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Session } from '../../interfaces/session';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {

  public sessions_id: string | null = "";
  public sessions$: Observable<Session[]> = new Observable<Session[]>();

  constructor(private activatedRoute: ActivatedRoute, private sessions_service: SessionsService){}

  ngOnInit() {

    this.sessions_id = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.sessions_id != null) {

      this.sessions$ = this.sessions_service.getSession(this.sessions_id);

    }

  }

}
