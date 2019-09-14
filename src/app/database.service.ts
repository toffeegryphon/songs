import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  artists: AngularFirestoreCollection = this.db.collection('artists');

  constructor(private db: AngularFirestore) { }

  // Return -1 if failed, 0 if already exists, 1 if added
  // Maybe convert to promise
  addArtist(artist: object) {
    let result = this.artists.doc(artist['id']).get().subscribe(doc => {
      if (!doc.exists) {
        this.artists.doc(artist['id']).set(artist).then(() => result.unsubscribe());
        console.log('DatabaseService: Added');
        return 1;
      } else {
        console.log('DatabaseService: Already Exists');
        result.unsubscribe();
        return 0;
      }
    }, () => {
      console.log('DatabaseService: Error');
      return -1
    });
    return result;
  }

  getArtist(artistId: string): Observable<any> {
    return this.artists.doc(artistId).get();
  }

  addRecordings(recordings: object[], artistId: string) {
    return this.artists.doc(artistId).get().subscribe(doc => {
      if (doc.exists) {
        let existingRecordings: object[] = doc.data().recordings;
        // TODO: probably should just set all
        if (existingRecordings == null) {
          console.log('Adding all...');
          this.artists.doc(artistId).update({
            'recordings': recordings,
            'recording-count': recordings.length
          });
        } else {
          // Maybe got better way?
          console.log('Adding some...?');
          if (recordings.length != existingRecordings.length) {
            let newRecordings: object[];
            recordings.filter(recording => !existingRecordings.includes(recording))
            console.log(newRecordings);
          }
        }
      } else {
        console.error('Artist does not exist!');
      }
    });
  }
}
