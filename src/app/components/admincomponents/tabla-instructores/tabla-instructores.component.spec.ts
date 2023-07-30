import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInstructoresComponent } from './tabla-instructores.component';

describe('TablaInstructoresComponent', () => {
  let component: TablaInstructoresComponent;
  let fixture: ComponentFixture<TablaInstructoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInstructoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaInstructoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
