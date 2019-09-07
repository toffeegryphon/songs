import { TestBed } from '@angular/core/testing';

import { FindService } from './search.service';

describe('FindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindService = TestBed.get(FindService);
    expect(service).toBeTruthy();
  });
});
