import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CatalogComponent } from './catalog.component';
import { EventsService } from '../../services/events.service';
import { provideHttpClient } from '@angular/common/http';
import { Event } from '../../interfaces/event';
import { of } from 'rxjs';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let service: EventsService;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [CatalogComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(EventsService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get events when init component', () => {

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

    spyOn(service, 'getEvents').and.returnValue(of(dummyEvents));

    component.ngOnInit();

    component.events$.subscribe((events: Event[]) => {

      expect(events).toEqual(dummyEvents);

    })

  })

});
