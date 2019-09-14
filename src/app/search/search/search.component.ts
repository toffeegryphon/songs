import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { CleanService } from 'src/app/clean.service';
import { SearchService } from 'src/app/search.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  constructor(private databaseService: DatabaseService, private cleanService: CleanService, private searchService: SearchService) { }

  ngOnInit() {
  }

  search(query: string) {
    console.log(query);
    let artist: object;

    this.searchService.artists(query).pipe(switchMap(results => {
      artist = this.cleanService.artist(results['artists'][0]);
      return this.databaseService.getArtist(artist['id']);
    })).subscribe(doc => {
      if (doc.exists && doc.data().recordings != null) {
        let recordings: object[] = doc.data().recordings;
        console.log(recordings);
      } else {
        // Faster but unsafe: Run concurrently since search def. slower - NO GO slower than 1 page
        this.databaseService.addArtist(artist).add(() => {
          this.searchService.recordings(artist['id']).subscribe(recordings => {
            let cleaned: object[] = this.cleanService.recordings(recordings);
            this.databaseService.addRecordings(cleaned, artist['id']);
          });
        });
      }
    });
  }
}
