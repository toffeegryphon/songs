import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { expand, map, reduce } from 'rxjs/operators'

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
export class SearchService {

  constructor(private http: HttpClient) { }

  findArtists(query: string): Observable<JSON> {
    query.replace(' ', '%20');
    return this.http.get<JSON>(searchArtists(query), httpOptions);
  }

  // TODO async: Find and clean page by page. Once page done, add to template

  findRecordings(id: string): Observable<any> {
    return this.getRecordings(id).pipe(
      expand(result => {
        if (result['recording-offset'] + 100 < result['recording-count']) {
          return this.getRecordings(id, result['recording-offset'] + 100)
        } else {
          return []
        }
      })).pipe(
      map(result => result['recordings'])).pipe(
      reduce((acc: Array<Object>, result: Array<Object>) => acc.concat(result), [])
    )
  }

  private getRecordings(id: string, offset:number = 0, recordings: Array<JSON> = []) {
    return this.http.get<JSON>(searchRecordings(id, 100, offset), httpOptions);
  }
}