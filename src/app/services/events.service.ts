import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  public getEvents(): Observable<Event[]> {

    return this.http.get<Event[]>("http://localhost:4200/assets/data/events.json").pipe(
      map(events => events.sort((a: Event, b: Event) =>
        (new Date(parseInt(a.endDate))).getTime() - (new Date(parseInt(b.endDate))).getTime()
      )));

  }

}
