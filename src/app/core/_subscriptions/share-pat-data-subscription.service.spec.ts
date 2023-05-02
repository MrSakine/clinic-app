import { TestBed } from '@angular/core/testing';

import { SharePatDataSubscriptionService } from './share-pat-data-subscription.service';

describe('SharePatDataSubscriptionService', () => {
  let service: SharePatDataSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharePatDataSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
