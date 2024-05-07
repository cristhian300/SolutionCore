import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonGenericComponent } from './boton-generic.component';

describe('BotonGenericComponent', () => {
  let component: BotonGenericComponent;
  let fixture: ComponentFixture<BotonGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonGenericComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
