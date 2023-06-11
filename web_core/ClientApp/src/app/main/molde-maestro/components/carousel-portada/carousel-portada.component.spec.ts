import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPortadaComponent } from './carousel-portada.component';

describe('CarouselPortadaComponent', () => {
  let component: CarouselPortadaComponent;
  let fixture: ComponentFixture<CarouselPortadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselPortadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPortadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
