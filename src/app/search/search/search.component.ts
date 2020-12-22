import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { CleanService } from 'src/app/clean.service';
import { SearchService } from 'src/app/search.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public artistId: string;
  public recordings: object[];
  public searching: boolean = false;

  constructor(private databaseService: DatabaseService, private cleanService: CleanService, private searchService: SearchService) { }

  ngOnInit() {
  }

  search(query: string) {
    if (!query || this.searching) {
      return;
    }

    this.searching = true;
    // console.log(query);
    
    this.searchService.post(query).subscribe();

    let artist: object;

    this.searchService.artists(query).pipe(switchMap(results => {
      artist = this.cleanService.artist(results['artists'][0]);
      this.artistId = artist['id']
      return this.databaseService.getArtist(this.artistId);
    })).subscribe(doc => {
      if (doc.exists && doc.data().recordings != null) {
        this.recordings = doc.data().recordings;
        // console.log(this.recordings);
      } else {
        // Faster but unsafe: Run concurrently since search def. slower - NO GO slower than 1 page
        this.databaseService.addArtist(artist).add(() => {
          this.searchService.recordings(this.artistId).subscribe(recordings => {
            this.recordings = this.cleanService.recordings(recordings);
            this.databaseService.addRecordings(this.recordings, this.artistId);
            // console.log(this.recordings);
          });
        });
      }
      this.searching = false
    });
  }

  refresh() {
    // console.log('refresh')
    if (!this.artistId || this.searching) return
    // console.log('refreshing')
    this.searching = true

    this.searchService.recordings(this.artistId).subscribe(recordings => {
      this.recordings = this.cleanService.recordings(recordings)
      this.databaseService.addRecordings(this.recordings, this.artistId)
      this.searching = false
    })
  }
}
