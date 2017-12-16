import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Proforma8Component } from './proforma8.component';

describe('Proforma8Component', () => {
  let component: Proforma8Component;
  let fixture: ComponentFixture<Proforma8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Proforma8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Proforma8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
