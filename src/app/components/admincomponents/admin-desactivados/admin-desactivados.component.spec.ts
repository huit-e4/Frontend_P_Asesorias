import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDesactivadosComponent } from './admin-desactivados.component';

describe('AdminDesactivadosComponent', () => {
  let component: AdminDesactivadosComponent;
  let fixture: ComponentFixture<AdminDesactivadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDesactivadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDesactivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
