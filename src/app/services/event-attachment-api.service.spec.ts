import { TestBed, inject } from '@angular/core/testing';

import { EventAttachmentApiService } from './event-attachment-api.service';

describe('EventAttachmentApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventAttachmentApiService]
    });
  });

  it('should be created', inject([EventAttachmentApiService], (service: EventAttachmentApiService) => {
    expect(service).toBeTruthy();
  }));
});
