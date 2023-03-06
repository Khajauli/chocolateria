import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoAComponent } from './encabezado-a.component';

describe('EncabezadoAComponent', () => {
  let component: EncabezadoAComponent;
  let fixture: ComponentFixture<EncabezadoAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
