import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoChocolateComponent } from './nuevo-chocolate.component';

describe('NuevoChocolateComponent', () => {
  let component: NuevoChocolateComponent;
  let fixture: ComponentFixture<NuevoChocolateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoChocolateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoChocolateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
