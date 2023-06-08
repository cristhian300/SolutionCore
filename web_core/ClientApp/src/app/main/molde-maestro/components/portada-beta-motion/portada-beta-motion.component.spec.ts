import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortadaBetaMotionComponent } from './portada-beta-motion.component';

describe('PortadaBetaMotionComponent', () => {
  let component: PortadaBetaMotionComponent;
  let fixture: ComponentFixture<PortadaBetaMotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortadaBetaMotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortadaBetaMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
