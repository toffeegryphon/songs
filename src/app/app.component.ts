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

  constructor(private searchService: SearchService, private cleanService: CleanService, private db: AngularFirestore) {
    searchService.findArtists('dua lipa').subscribe(val => this.save(val));

    let recordings$: Observable<Object[]> = searchService.findArtists('dua lipa').pipe(switchMap(artists => this.save(artists)));
    recordings$.subscribe(recordings => this.clean(recordings));
  }

  save(val: JSON) {
    this.dirty = val;
    console.log(this.dirty);
    let cleaned = this.cleanService.clean(this.dirty['artists'][0]);

    let artists: AngularFirestoreCollection = this.db.collection('artists');
    artists.doc(cleaned['id']).get().subscribe(doc => {
      if (!doc.exists) {
        artists.doc(cleaned['id']).set(cleaned);
      }
    });

    return this.searchService.findRecordings(cleaned['id']);
  }

  clean(val: Object[]) {
    console.log(val)
    this.cleanService.recordings(val);
  }
}
