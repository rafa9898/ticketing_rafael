import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format end or start date', ()=> {

    const dummyEndDate: string = '1447196400000';

    component.ngOnInit();

    if(dummyEndDate != undefined) {

      const date = new Date(parseInt(dummyEndDate));

      const formatted_date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

      expect(formatted_date).toEqual('11/10/2015');

    }

  })

});
