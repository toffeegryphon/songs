import { Component } from '@angular/core';
import { FindService } from './search.service';
import { CleanService } from './clean.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [
    FindService, 
    CleanService]
})

export class AppComponent {
  title: string = 'songs2';
  dirty: JSON;

  constructor(private findService: FindService, private cleanService: CleanService, private db: AngularFirestore) {
    findService.findArtists('dua lipa').subscribe(val => this.save(val))
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

    this.findService.findRecordings(cleaned['id']).subscribe(val => this.clean(val));
  }

  clean(val: Array<Object>) {
    console.log(val)
    this.cleanService.recordings(val);
  }
}
