import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortadaMotionComponent } from './portada-motion.component';

describe('PortadaMotionComponent', () => {
  let component: PortadaMotionComponent;
  let fixture: ComponentFixture<PortadaMotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortadaMotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortadaMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
