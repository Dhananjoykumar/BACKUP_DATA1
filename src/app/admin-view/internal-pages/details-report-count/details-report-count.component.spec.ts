import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReportCountComponent } from './details-report-count.component';

describe('DetailsReportCountComponent', () => {
  let component: DetailsReportCountComponent;
  let fixture: ComponentFixture<DetailsReportCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsReportCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsReportCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
