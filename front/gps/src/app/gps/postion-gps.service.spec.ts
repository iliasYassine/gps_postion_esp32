import { TestBed } from '@angular/core/testing';

import { PostionGpsService } from './postion-gps.service';

describe('PostionGpsService', () => {
  let service: PostionGpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostionGpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
