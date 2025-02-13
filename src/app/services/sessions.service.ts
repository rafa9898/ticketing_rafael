import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Session } from '../interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient) { }

  public getSession(id: string):Observable<Session[]>{

    return this.http.get("http://localhost:4200/assets/data/event-info-" + id + ".json").pipe(map((response: any) => {

      return response.sessions;

    }))

  }

}
