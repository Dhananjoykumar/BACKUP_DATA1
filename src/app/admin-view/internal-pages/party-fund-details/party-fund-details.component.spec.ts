import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyFundDetailsComponent } from './party-fund-details.component';

describe('PartyFundDetailsComponent', () => {
  let component: PartyFundDetailsComponent;
  let fixture: ComponentFixture<PartyFundDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyFundDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyFundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
