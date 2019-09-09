import { Component } from '@angular/core';
import { FindService } from './search.service';
import { CleanService } from './clean.service';

import { expand, map, reduce, concat, mergeMap } from 'rxjs/operators'
import { pipe, merge } from 'rxjs';

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

  constructor(private findService: FindService, private cleanService: CleanService) {
    findService.findArtists('dua lipa').subscribe(val => this.save(val))
  }
  save(val: JSON) {
    this.dirty = val;
    console.log(this.dirty);
    let cleaned = this.cleanService.clean(this.dirty['artists'][0]);
    // this.findService.findRecordings(cleaned['id']).subscribe(val => this.clean(val));
    this.findService.findRecordings(cleaned['id']).subscribe(val => console.log(val));
  }

  clean(val: JSON) {
    console.log(val)
    this.cleanService.recordings(val);
  }
}
