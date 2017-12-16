import { TestBed, inject } from '@angular/core/testing';

import { PartyServiceService } from './party-service.service';

describe('PartyServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartyServiceService]
    });
  });

  it('should ...', inject([PartyServiceService], (service: PartyServiceService) => {
    expect(service).toBeTruthy();
  }));
});
