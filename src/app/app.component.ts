import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { CleanService } from './clean.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    SearchService, 
    CleanService]
})

export class AppComponent {
  title: string = 'songs2';
  dirty: JSON;

  artistId: string;
  artists: AngularFirestoreCollection = this.db.collection('artists');

  constructor(private searchService: SearchService, private cleanService: CleanService, private db: AngularFirestore, private databaseService: DatabaseService) {
  }
}
