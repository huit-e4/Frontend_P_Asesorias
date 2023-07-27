import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstidiantescomponentComponent } from './estidiantescomponent.component';

describe('EstidiantescomponentComponent', () => {
  let component: EstidiantescomponentComponent;
  let fixture: ComponentFixture<EstidiantescomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstidiantescomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstidiantescomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
