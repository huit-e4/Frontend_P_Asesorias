import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudesAComponent } from './tabla-solicitudes-a.component';

describe('TablaSolicitudesAComponent', () => {
  let component: TablaSolicitudesAComponent;
  let fixture: ComponentFixture<TablaSolicitudesAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSolicitudesAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaSolicitudesAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
