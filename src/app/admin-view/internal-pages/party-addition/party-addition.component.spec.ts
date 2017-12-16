import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAdditionComponent } from './party-addition.component';

describe('PartyAdditionComponent', () => {
  let component: PartyAdditionComponent;
  let fixture: ComponentFixture<PartyAdditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyAdditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
