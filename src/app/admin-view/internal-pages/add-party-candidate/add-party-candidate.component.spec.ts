import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartyCandidateComponent } from './add-party-candidate.component';

describe('AddPartyCandidateComponent', () => {
  let component: AddPartyCandidateComponent;
  let fixture: ComponentFixture<AddPartyCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartyCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartyCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
