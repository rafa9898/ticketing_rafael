import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Event } from '../interfaces/event';

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;
  const baseURL = "http://localhost:4200/assets/data/events.json";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpMock.verify();

  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all events', () => {

    const dummyEvents: Event[] = [
      {
        "id": "184",
        "title": "PABLO ALBORÁN",
        "subtitle": "Terral (2014)",
        "image": "/assets/img/sample-image.jpg",
        "place": "Palau Sant Jordi, Barcelona",
        "startDate": "1442959200000",
        "endDate": "1447196400000",
        "description": "Pablo Alborán vuelve a los escenarios para presentar Terral (2014), un nuevo trabajo discográfico donde el artista de Málaga mantiene las constantes creativas que le han convertido en favorito del público: delicadeza, romanticismo y preciosismo melódico."
      },
      {
        "id": "219",
        "title": "MANÁ",
        "subtitle": "Cama incendiada",
        "image": "/assets/img/sample-image.jpg",
        "place": "Fòrum, Barcelona",
        "startDate": "1439416800000",
        "endDate": "1455836400000",
        "description": "Aparentar es una forma de mentir. Confiar sólo en la apariencia nos puede alejar de la esencia. Cama Incendiada, la nueva producción de Maná, no aparenta, es… "
      },
      {
        "id": "68",
        "title": "JOAN MANUEL SERRAT",
        "subtitle": "Antología desordenada",
        "image": "/assets/img/sample-image.jpg",
        "place": "Camp de Mart, Tarragona",
        "startDate": "1443650400000",
        "endDate": "1446159600000",
        "description": "Cinquanta cançons en un disc quàdruple, un llibre amb textos personals i un centenar de fotografies per commemorar mig segle als escenaris."
      },
      {
        "id": "175",
        "title": "KAREN SOUZA",
        "subtitle": "Essentials",
        "image": "/assets/img/sample-image.jpg",
        "place": "Luz de Gas, Barcelona",
        "startDate": "1442268000000",
        "endDate": "1449270000000",
        "description": "While Karen Souza´s voice may sound like it was made for jazz, she is in fact a relative newcomer to this genre of music."
      }
    ]

    service.getEvents().subscribe((events: Event[]) => {

      expect(events).toBe(dummyEvents);

    });

    const req = httpMock.expectOne(baseURL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEvents);

  })

});
