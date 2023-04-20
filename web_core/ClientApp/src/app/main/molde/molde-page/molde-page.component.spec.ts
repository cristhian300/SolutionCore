import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoldePageComponent } from './molde-page.component';

describe('MoldePageComponent', () => {
  let component: MoldePageComponent;
  let fixture: ComponentFixture<MoldePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoldePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoldePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
