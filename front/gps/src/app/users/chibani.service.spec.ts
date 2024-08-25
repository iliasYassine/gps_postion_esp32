import { TestBed } from '@angular/core/testing';

import { ChibaniService } from './chibani.service';

describe('ChibaniService', () => {
  let service: ChibaniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChibaniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
