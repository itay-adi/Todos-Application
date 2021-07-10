import { TestBed } from '@angular/core/testing';

import { ListDeleteService } from './list-delete.service';

describe('ListDeleteService', () => {
  let service: ListDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
