import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturePortadaComponent } from './picture-portada.component';

describe('PicturePortadaComponent', () => {
  let component: PicturePortadaComponent;
  let fixture: ComponentFixture<PicturePortadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicturePortadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturePortadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
