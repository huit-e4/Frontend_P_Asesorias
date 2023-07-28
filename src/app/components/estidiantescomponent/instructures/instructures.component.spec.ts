import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructuresComponent } from './instructures.component';

describe('InstructuresComponent', () => {
  let component: InstructuresComponent;
  let fixture: ComponentFixture<InstructuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructuresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
