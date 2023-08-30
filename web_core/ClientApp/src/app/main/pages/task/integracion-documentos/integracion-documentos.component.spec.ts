import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracionDocumentosComponent } from './integracion-documentos.component';

describe('IntegracionDocumentosComponent', () => {
  let component: IntegracionDocumentosComponent;
  let fixture: ComponentFixture<IntegracionDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegracionDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegracionDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
