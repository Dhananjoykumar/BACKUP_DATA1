import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationDailyComponent } from './nomination-daily.component';

describe('NominationDailyComponent', () => {
  let component: NominationDailyComponent;
  let fixture: ComponentFixture<NominationDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
