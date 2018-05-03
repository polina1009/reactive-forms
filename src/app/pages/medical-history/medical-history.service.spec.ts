import { TestBed, inject } from '@angular/core/testing';

import { MedicalHistoryService } from './medical-history.service';

describe('MedicalHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalHistoryService]
    });
  });

  it('should be created', inject([MedicalHistoryService], (service: MedicalHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
