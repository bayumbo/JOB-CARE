import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosGeneralesCompradosComponent } from './cursos-generales-comprados.component';

describe('CursosGeneralesCompradosComponent', () => {
  let component: CursosGeneralesCompradosComponent;
  let fixture: ComponentFixture<CursosGeneralesCompradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosGeneralesCompradosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosGeneralesCompradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
