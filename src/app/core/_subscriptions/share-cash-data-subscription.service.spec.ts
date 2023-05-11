import { TestBed } from '@angular/core/testing';

import { ShareCashDataSubscriptionService } from './share-cash-data-subscription.service';

describe('ShareCashDataSubscriptionService', () => {
  let service: ShareCashDataSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareCashDataSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
