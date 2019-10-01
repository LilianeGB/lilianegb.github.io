import { TestBed } from '@angular/core/testing';

import { CantorService } from './cantor.service';

describe('CantorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CantorService = TestBed.get(CantorService);
    expect(service).toBeTruthy();
  });
});
