import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Session } from '../interfaces/session';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient) { }

  /**
    * @description Method to obtain all the sessions of an Event.
    * 
    * @param {String} id Event ID
    * 
	  * @returns {Observable<Session[]>} Returns observable with array of Sessions
    */
  public getSession(id: string): Observable<Session[]> {

    return this.http.get("http://localhost:4200/assets/data/event-info-" + id + ".json").pipe(map((response: any) => {

      return response.sessions;

    }))

  }

  /**
    * @description Method to obtain all the data of an Event.
    * 
    * @param {String} id Event ID
    * 
	  * @returns {Observable<Event>} Returns observable with an Event
    */
  public getDataSession(id: string): Observable<Event> {

    return this.http.get("http://localhost:4200/assets/data/event-info-" + id + ".json").pipe(map((response: any) => {

      return response.event;

    }))

  }

}
