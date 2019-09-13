import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { CleanService } from './clean.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [
    SearchService, 
    CleanService]
})

export class AppComponent {
  title: string = 'songs2';
  dirty: JSON;

  artistId: string;
  artists: AngularFirestoreCollection = this.db.collection('artists');

  constructor(private searchService: SearchService, private cleanService: CleanService, private db: AngularFirestore) {
    // searchService.findArtists('dua lipa').subscribe(val => this.save(val));

    let recordings$: Observable<Object[]> = searchService.findArtists('dua lipa').pipe(switchMap(artists => this.save(artists)));
    recordings$.subscribe(recordings => this.clean(recordings));
  }

  save(val: JSON) {
    this.dirty = val;
    console.log(this.dirty);
    let cleaned = this.cleanService.artist(this.dirty['artists'][0]);
    this.artistId = cleaned['id'];

    this.artists.doc(cleaned['id']).get().subscribe(doc => {
      if (!doc.exists) {
        this.artists.doc(cleaned['id']).set(cleaned);
      }
    });

    return this.searchService.findRecordings(cleaned['id']);
  }

  clean(val: Object[]) {
    console.log(val)
    let cleaned: Object[] = this.cleanService.recordings(val);
    let recording: Object[];
    let artist$: Observable<any> = this.artists.doc(this.artistId).get();
    artist$.subscribe(doc => {
      if (doc.exists) {
        let artist = doc.data();
        recording = artist.recordings;
        console.log(artist);
        console.log(artist.recordings)
        if (recording == null) {
          console.log('null');
          artist.recordings = cleaned;
          this.artists.doc(this.artistId).update({
            'recordings' : cleaned
          });
        }
      }
    })
  }
}
