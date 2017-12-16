import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Proforma7Component } from './proforma7.component';

describe('Proforma7Component', () => {
  let component: Proforma7Component;
  let fixture: ComponentFixture<Proforma7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Proforma7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Proforma7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
