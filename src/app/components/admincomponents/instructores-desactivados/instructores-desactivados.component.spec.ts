import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructoresDesactivadosComponent } from './instructores-desactivados.component';

describe('InstructoresDesactivadosComponent', () => {
  let component: InstructoresDesactivadosComponent;
  let fixture: ComponentFixture<InstructoresDesactivadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructoresDesactivadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructoresDesactivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
