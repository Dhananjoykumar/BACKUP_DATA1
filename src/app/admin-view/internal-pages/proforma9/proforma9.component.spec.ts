import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Proforma9Component } from './proforma9.component';

describe('Proforma9Component', () => {
  let component: Proforma9Component;
  let fixture: ComponentFixture<Proforma9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Proforma9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Proforma9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
