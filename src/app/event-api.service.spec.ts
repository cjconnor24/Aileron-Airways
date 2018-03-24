import { TestBed, inject } from '@angular/core/testing';

import { EventApiService } from './event-api.service';

describe('EventApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventApiService]
    });
  });

  it('should be created', inject([EventApiService], (service: EventApiService) => {
    expect(service).toBeTruthy();
  }));
});
