import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosUComponent } from './productos-u.component';

describe('ProductosUComponent', () => {
  let component: ProductosUComponent;
  let fixture: ComponentFixture<ProductosUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
