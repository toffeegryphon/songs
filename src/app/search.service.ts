import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import { expand, last, map, reduce, catchError, retry, retryWhen, max, delay, mergeMap } from 'rxjs/operators'

const artistsUrl = (query: string, limit: number = 3, offset: number = 0) => 
  `https://musicbrainz.org/ws/2/artist?query=${query}&limit=${limit}&offset=${offset}`;

const recordingsUrl = (id: string, limit: number = 100, offset: number = 0) => 
  `https://musicbrainz.org/ws/2/recording?artist=${id}&limit=${limit}&offset=${offset}`;

const httpOptions = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  post(lastSearched: string): Observable<string> {
    return this.http.post<string>('/', lastSearched);
  }

  artists(query: string, limit: number = 3, offset: number = 0): Observable<JSON> {
    query.replace(' ', '%20');
    return this.http.get<JSON>(artistsUrl(query, limit, offset), httpOptions);
    // TODO Pipe, return solely results
  }

  // TODO async: Find and clean page by page. Once page done, add to template

  recordings(artistId: string): Observable<Object[]> { 
    // TODO Definitely need better retry strategy
    // If fail, should upload sucess first before retrying others
    let isError = false
    return this.getRecordings(artistId).pipe(
      expand(result => {
        if (!isError && result['recording-offset'] + 100 < result['recording-count']) {
          return this.getRecordings(artistId, result['recording-offset'] + 100);
        } else {
          return [];
        }
      }),
      catchError((err, caught) => {
        // TODO Write better way, also continue from failed/remember where to continue
        isError = true
        return caught
      }),
      map(result => {
        console.log(result)
        return result['recordings'];
      }),
      reduce((acc: Array<Object>, result: Array<Object>) => acc.concat(result), [])
    )
  }

  private getRecordings(id: string, offset:number = 0) {
    return this.http.get<JSON>(recordingsUrl(id, 100, offset), httpOptions).pipe(
      this.delayedRetry(1000, 0)
    )
  }

  private delayedRetry(delayMs: number, maxRetry: number) {
    let retries = maxRetry;

    return (src: Observable<any>) => src.pipe(
      retryWhen((err: Observable<any>) => err.pipe(
        delay(delayMs),
        mergeMap(err => retries-- > 0 ? of(err) : throwError(err))
      ))
    )
  }
 }