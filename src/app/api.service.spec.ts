import { TestBed, inject } from '@angular/core/testing';

import { TimelineApiService } from './Timelineapi.service';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpHeaders } from '@angular/common/http';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
          deps: [MockBackend, BaseRequestOptions,Headers,HttpHeaders]
        },
        MockBackend,
        BaseRequestOptions,
        TimelineApiService
      ]
    });
  });

  it('should ...', inject([TimelineApiService], (service: TimelineApiService) => {
    expect(service).toBeTruthy();
  }));
});
