import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyRepresentativeTableComponent } from './party-representative-table.component';

describe('PartyRepresentativeTableComponent', () => {
  let component: PartyRepresentativeTableComponent;
  let fixture: ComponentFixture<PartyRepresentativeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyRepresentativeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyRepresentativeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
