import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortadaAlfaComponent } from './portada-alfa.component';

describe('PortadaAlfaComponent', () => {
  let component: PortadaAlfaComponent;
  let fixture: ComponentFixture<PortadaAlfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortadaAlfaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortadaAlfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
