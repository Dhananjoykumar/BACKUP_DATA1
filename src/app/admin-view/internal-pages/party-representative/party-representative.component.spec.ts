import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyRepresentativeComponent } from './party-representative.component';

describe('PartyRepresentativeComponent', () => {
  let component: PartyRepresentativeComponent;
  let fixture: ComponentFixture<PartyRepresentativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyRepresentativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
