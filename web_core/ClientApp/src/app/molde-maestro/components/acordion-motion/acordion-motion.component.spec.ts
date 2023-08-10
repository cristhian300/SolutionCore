import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  AcordionMotionComponent } from './acordion-motion.component';

describe('PortadaMotionComponent', () => {
  let component: AcordionMotionComponent;
  let fixture: ComponentFixture<AcordionMotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcordionMotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcordionMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
