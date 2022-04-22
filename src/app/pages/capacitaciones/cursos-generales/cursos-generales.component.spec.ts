import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosGeneralesComponent } from './cursos-generales.component';

describe('CursosGeneralesComponent', () => {
  let component: CursosGeneralesComponent;
  let fixture: ComponentFixture<CursosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosGeneralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
