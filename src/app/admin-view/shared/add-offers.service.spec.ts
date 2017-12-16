import { TestBed, inject } from '@angular/core/testing';

import { AddOffersService } from './add-offers.service';

describe('AddOffersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddOffersService]
    });
  });

  it('should ...', inject([AddOffersService], (service: AddOffersService) => {
    expect(service).toBeTruthy();
  }));
});
