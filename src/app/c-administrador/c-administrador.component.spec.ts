import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAdministradorComponent } from './c-administrador.component';

describe('CAdministradorComponent', () => {
  let component: CAdministradorComponent;
  let fixture: ComponentFixture<CAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
