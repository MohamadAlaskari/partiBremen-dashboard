import { TestBed } from '@angular/core/testing';

import { UserBlockService } from './user-block.service';

describe('UserBlockService', () => {
  let service: UserBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
