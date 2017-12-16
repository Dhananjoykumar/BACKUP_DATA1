import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsTableComponent } from './add-news-table.component';

describe('AddNewsTableComponent', () => {
  let component: AddNewsTableComponent;
  let fixture: ComponentFixture<AddNewsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
