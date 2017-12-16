import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffersTableComponent } from './add-offers-table.component';

describe('AddOffersTableComponent', () => {
  let component: AddOffersTableComponent;
  let fixture: ComponentFixture<AddOffersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOffersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOffersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
