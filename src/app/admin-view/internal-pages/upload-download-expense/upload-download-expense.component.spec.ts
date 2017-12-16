import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDownloadExpenseComponent } from './upload-download-expense.component';

describe('UploadDownloadExpenseComponent', () => {
  let component: UploadDownloadExpenseComponent;
  let fixture: ComponentFixture<UploadDownloadExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDownloadExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDownloadExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
