import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscrepencyReportComponent } from './discrepency-report.component';

describe('DiscrepencyReportComponent', () => {
  let component: DiscrepencyReportComponent;
  let fixture: ComponentFixture<DiscrepencyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscrepencyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscrepencyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
