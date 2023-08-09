import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivadosComponent } from './desactivados.component';

describe('DesactivadosComponent', () => {
  let component: DesactivadosComponent;
  let fixture: ComponentFixture<DesactivadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesactivadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesactivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
