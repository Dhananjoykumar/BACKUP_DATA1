import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Proforma6Component } from './proforma6.component';

describe('Proforma6Component', () => {
  let component: Proforma6Component;
  let fixture: ComponentFixture<Proforma6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Proforma6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Proforma6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
