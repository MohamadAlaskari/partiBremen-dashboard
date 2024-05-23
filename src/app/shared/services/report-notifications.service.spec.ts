import { TestBed } from '@angular/core/testing';

import { ReportNotificationsService } from './report-notifications.service';

describe('ReportNotificationsService', () => {
  let service: ReportNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
