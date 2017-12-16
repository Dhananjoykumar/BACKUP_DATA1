import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStandardRatesComponent } from './upload-standard-rates.component';

describe('UploadStandardRatesComponent', () => {
  let component: UploadStandardRatesComponent;
  let fixture: ComponentFixture<UploadStandardRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStandardRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStandardRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
