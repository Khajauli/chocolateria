import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieTComponent } from './pie-t.component';

describe('PieTComponent', () => {
  let component: PieTComponent;
  let fixture: ComponentFixture<PieTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
