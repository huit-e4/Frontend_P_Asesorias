import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudesIComponent } from './tabla-solicitudes-i.component';

describe('TablaSolicitudesIComponent', () => {
  let component: TablaSolicitudesIComponent;
  let fixture: ComponentFixture<TablaSolicitudesIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSolicitudesIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaSolicitudesIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
