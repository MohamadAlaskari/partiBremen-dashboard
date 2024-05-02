import { TestBed } from '@angular/core/testing';

import { CommentManagementService } from './comment-management.service';

describe('CommentManagementService', () => {
  let service: CommentManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
