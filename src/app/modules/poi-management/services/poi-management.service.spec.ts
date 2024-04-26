import { TestBed } from '@angular/core/testing';

import { PoiManagementService } from './poi-management.service';

describe('PoiManagementService', () => {
  let service: PoiManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoiManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
