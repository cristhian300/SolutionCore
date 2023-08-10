import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePortadaComponent } from './home-portada.component';

describe('HomePortadaComponent', () => {
  let component: HomePortadaComponent;
  let fixture: ComponentFixture<HomePortadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePortadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePortadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
