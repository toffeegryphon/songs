import { TestBed } from '@angular/core/testing';

import { CleanService } from './clean.service';
import { HttpClientModule } from '@angular/common/http';

describe('CleanService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: CleanService = TestBed.get(CleanService);
    expect(service).toBeTruthy();
  });

  it('should clean up artist Object', () => {
    const service: CleanService = TestBed.get(CleanService);
    const testArtist: Object = {
      'area' : {},
      'name' : 'Dua Lipa',
      'id' : '6f1a58bf-9b1b-49cf-a44a-6cefad7ae04f',
      'score' : 100,
      'tags' : {}
    }
    const expectedResult: Object = {
      'name' : 'Dua Lipa',
      'id' : '6f1a58bf-9b1b-49cf-a44a-6cefad7ae04f'
    }
    const testResult = service.artist(JSON.parse(JSON.stringify(testArtist)));
    expect(testResult).toEqual(expectedResult);
  });
});
