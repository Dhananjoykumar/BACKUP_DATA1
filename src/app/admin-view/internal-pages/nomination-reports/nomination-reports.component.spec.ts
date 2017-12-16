import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationReportsComponent } from './nomination-reports.component';

describe('NominationReportsComponent', () => {
  let component: NominationReportsComponent;
  let fixture: ComponentFixture<NominationReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
