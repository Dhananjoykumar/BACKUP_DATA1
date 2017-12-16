import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyFundTableComponent } from './party-fund-table.component';

describe('PartyFundTableComponent', () => {
  let component: PartyFundTableComponent;
  let fixture: ComponentFixture<PartyFundTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyFundTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyFundTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
