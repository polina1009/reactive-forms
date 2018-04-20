import { TestBed, inject } from '@angular/core/testing';

import { FamilyHistoryService } from './family-history.service';

describe('FamilyHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamilyHistoryService]
    });
  });

  it('should be created', inject([FamilyHistoryService], (service: FamilyHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
