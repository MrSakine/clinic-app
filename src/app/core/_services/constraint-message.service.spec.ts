import { TestBed } from '@angular/core/testing';

import { ConstraintMessageService } from './constraint-message.service';

describe('ConstraintMessageService', () => {
  let service: ConstraintMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstraintMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
