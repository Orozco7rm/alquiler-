import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReservacionComponent } from './detalles-reservacion.component';

describe('DetallesReservacionComponent', () => {
  let component: DetallesReservacionComponent;
  let fixture: ComponentFixture<DetallesReservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesReservacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
