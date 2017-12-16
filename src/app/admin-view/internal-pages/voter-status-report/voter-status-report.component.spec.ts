import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterStatusReportComponent } from './voter-status-report.component';

describe('VoterStatusReportComponent', () => {
  let component: VoterStatusReportComponent;
  let fixture: ComponentFixture<VoterStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
