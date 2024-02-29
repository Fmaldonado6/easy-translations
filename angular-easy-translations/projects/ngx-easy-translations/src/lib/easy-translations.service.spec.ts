import { TestBed } from '@angular/core/testing';

import { EasyTranslationsService } from './easy-translations.service';

describe('EasyTranslationsService', () => {
  let service: EasyTranslationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EasyTranslationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
