import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMessagingComponent } from './dynamic-messaging.component';

describe('DynamicMessagingComponent', () => {
  let component: DynamicMessagingComponent;
  let fixture: ComponentFixture<DynamicMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
