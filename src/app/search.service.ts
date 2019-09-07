import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

const searchArtists = (query: string, limit: number = 3, offset: number = 0) => 
  `https://musicbrainz.org/ws/2/artist?query=${query}&limit=${limit}&offset=${offset}`;

const searchRecordings = (id: string, limit: number = 100, offset: number = 0) => 
  `https://musicbrainz.org/ws/2/recording?artist=${id}&limit=${limit}&offset=${offset}`;

const httpOptions = {
  headers: new HttpHeaders({
    'User-Agent': 'Songs/2.0'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FindService {

  constructor(private http: HttpClient) { }

  findArtists(query: string): Observable<JSON> {
    query.replace(' ', '%20');
    return this.http.get<JSON>(searchArtists(query), httpOptions);
  }

  //TODO async: Find and clean page by page. Once page done, add to template
  async findRecordings(id: string, offset:number = 0, recordings: Array<JSON> = []) {
    this.http.get<JSON>(searchRecordings(id, 100, offset), httpOptions).subscribe( result => this.check(result, id, recordings));
  }

  private async check(result: JSON, id: string, recordings: Array<JSON>): Promise<Array<JSON>> {
    recordings.push(...result['recordings']);
    console.log(recordings);

    let count: number = result['recording-count'];
    console.log(count);
    console.log(result['recording-offset']);

    if (result['recording-offset'] + 100 < result['recording-count']) {
      this.findRecordings(id, result['recording-offset'] + 100, recordings)
    } else {
      return recordings;
    }
  }
}
