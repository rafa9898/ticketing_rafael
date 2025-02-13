import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {

  public sessions_id: string | null = "";

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit() {

    this.sessions_id = this.activatedRoute.snapshot.paramMap.get('id');

  }

}
