import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieRComponent } from './pie-r.component';

describe('PieRComponent', () => {
  let component: PieRComponent;
  let fixture: ComponentFixture<PieRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
