import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieAComponent } from './pie-a.component';

describe('PieAComponent', () => {
  let component: PieAComponent;
  let fixture: ComponentFixture<PieAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
