import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudesRComponent } from './tabla-solicitudes-r.component';

describe('TablaSolicitudesRComponent', () => {
  let component: TablaSolicitudesRComponent;
  let fixture: ComponentFixture<TablaSolicitudesRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSolicitudesRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaSolicitudesRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
