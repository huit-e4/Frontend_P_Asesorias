import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDesactivadosComponent } from './students-desactivados.component';

describe('StudentsDesactivadosComponent', () => {
  let component: StudentsDesactivadosComponent;
  let fixture: ComponentFixture<StudentsDesactivadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsDesactivadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsDesactivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
