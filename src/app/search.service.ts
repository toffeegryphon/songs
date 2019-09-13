import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { expand, map, reduce } from 'rxjs/operators'

const artistsUrl = (query: string, limit: number = 3, offset: number = 0) => 
  `https://musicbrainz.org/ws/2/artist?query=${query}&limit=${limit}&offset=${offset}`;

const recordingsUrl = (id: string, limit: number = 100, offset: number = 0) => 
  `https://musicbrainz.org/ws/2/recording?artist=${id}&limit=${limit}&offset=${offset}`;

const httpOptions = {
  headers: new HttpHeaders({
    'User-Agent': 'Songs/2.0'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  artists(query: string, limit: number = 3, offset: number = 0): Observable<JSON> {
    query.replace(' ', '%20');
    return this.http.get<JSON>(artistsUrl(query, limit, offset), httpOptions);
    // TODO Pipe, return solely results
  }

  // TODO async: Find and clean page by page. Once page done, add to template

  recordings(artistId: string): Observable<Object[]> {
    return this.getRecordings(artistId).pipe(
      expand(result => {
        if (result['recording-offset'] + 100 < result['recording-count']) {
          return this.getRecordings(artistId, result['recording-offset'] + 100);
        } else {
          return [];
        }
      })).pipe(
      map(result => result['recordings'])).pipe(
      reduce((acc: Array<Object>, result: Array<Object>) => acc.concat(result), [])
    );
  }

  private getRecordings(id: string, offset:number = 0) {
    return this.http.get<JSON>(recordingsUrl(id, 100, offset), httpOptions);
  }
}