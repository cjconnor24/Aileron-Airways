import { TestBed, inject } from '@angular/core/testing';

import { IdeagenService } from './ideagen.service';

describe('IdeagenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdeagenService]
    });
  });

  it('should be created', inject([IdeagenService], (service: IdeagenService) => {
    expect(service).toBeTruthy();
  }));
});
