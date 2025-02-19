import { TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SessionsService } from './sessions.service';
import { Session } from '../interfaces/session';
import { Event } from '../interfaces/event';


describe('SessionsService', () => {
  let service: SessionsService;
  let httpMock: HttpTestingController;
  const baseURL = "http://localhost:4200/assets/data/event-info-184.json";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(SessionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpMock.verify();

  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get sessions from an ID', () => {

    const dummyID: string = '184';

    const dummySessions: Session[] = [
      {
        "date": "1443564000000",
        "availability": "6"
      },
      {
        "date": "1442959200000",
        "availability": "3"
      },
      {
        "date": "1447196400000",
        "availability": "10"
      },
      {
        "date": "1444428000000",
        "availability": "5"
      },
      {
        "date": "1446332400000",
        "availability": "8"
      }
    ]

    service.getSession(dummyID).subscribe((sessions: Session[]) => {

      expect(sessions).toBe(dummySessions);

    });

    const req = httpMock.expectOne(baseURL);
    expect(req.request.method).toBe('GET');
    req.flush(dummySessions);

  })

  it('should get data from an ID', () => {

    const dummyID: string = '184';

    const dummyEvent: Event = {
      "id": "184",
      "title": "PABLO ALBORÁN",
      "subtitle": "Terral (2014)",
      "image": "/assets/img/sample-image.jpg"
    }

      service.getDataSession(dummyID).subscribe((event: Event) => {

        expect(event).toBe(dummyEvent);

      });

    const req = httpMock.expectOne(baseURL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEvent);

  })

});
