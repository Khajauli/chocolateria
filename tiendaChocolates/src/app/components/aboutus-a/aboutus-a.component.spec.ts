import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusAComponent } from './aboutus-a.component';

describe('AboutusAComponent', () => {
  let component: AboutusAComponent;
  let fixture: ComponentFixture<AboutusAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutusAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutusAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
