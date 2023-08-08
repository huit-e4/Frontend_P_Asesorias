import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesoriasDesactivadosdosComponent } from './asesorias-desactivadosdos.component';

describe('AsesoriasDesactivadosdosComponent', () => {
  let component: AsesoriasDesactivadosdosComponent;
  let fixture: ComponentFixture<AsesoriasDesactivadosdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesoriasDesactivadosdosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsesoriasDesactivadosdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
