import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Proforma5Component } from './proforma5.component';

describe('Proforma5Component', () => {
  let component: Proforma5Component;
  let fixture: ComponentFixture<Proforma5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Proforma5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Proforma5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
