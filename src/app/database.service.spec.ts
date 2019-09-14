import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('DatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFirestoreModule
    ]
  }));

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });
});
