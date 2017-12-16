import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyCandidateTableComponent } from './party-candidate-table.component';

describe('PartyCandidateTableComponent', () => {
  let component: PartyCandidateTableComponent;
  let fixture: ComponentFixture<PartyCandidateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyCandidateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyCandidateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
