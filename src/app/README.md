# SongFinder 2.0

## Services

### Search

#### `artists(query: string, limit: number = 3, offset: number = 0)`

> Searches for `query` on Musicbrainz, returning `Observable<JSON>` of `limit` number of results. Get `Array` of results by subscribing and calling `result['artists']`.

> TODO: return `Array[artists]` directly.

#### `recordings(artistId: string)`

> Searches for all recordings by `artistId` on Musicbrainz, returning `Observable<Object[]>`. Get `Array` of results by subscribing.

---

### Clean

#### `artist(dirty: JSON)`

> Returns as an `Object` only necessary fields (`name`, `id`) from raw `result['artists']['artist']` query from `searchService.artists()`.

> `artist = { `  
&nbsp; &nbsp; `name : Dua Lipa,`  
&nbsp; &nbsp; `id :6f1a58bf-9b1b-49cf-a44a-6cefad7ae04f`  
`}`

#### `recordings(dirty: Array<Object>)`

> Returns as an `Object` only necessary fields (`code`, `title`, `id`) from raw query from `searchService.recordings()`.

> `recordings = {`  
&nbsp; &nbsp; `...,`    
&nbsp; &nbsp; `[`  
&nbsp; &nbsp; &nbsp; &nbsp; `code : rollindidyousee,`  
&nbsp; &nbsp; &nbsp; &nbsp; `title : Rollin'/Did You See,`  
&nbsp; &nbsp; &nbsp; &nbsp; `id : 42087b88-6841-4988-b4b7-766a475131a1`  
&nbsp; &nbsp; `],`  
&nbsp; &nbsp; `...`  
`}`

> Note: `code` is the unique identifier. There may be many recordings of the same song under different circumstances (e.g. location), all with their own `id`. The included `id` is just from one of them.
  
## Log

7/9/19 2000
**** DUDE spent so long doing this when Im supposed to be writing essays
spent over 2 hourse stuck on 1 stupid thing:
trying to write a recursive function to pull all recordings from artist
as results are paginated.

in about 30 mins got the basic logic and a simple reccursion down
but can only log to console, no return value.

So spent the next FOREVER working on trying to figure out how to turn
it into a recursive function that returns just one single observable array

spent like over an hour trying to figure out wth are switchmaps mergemaps
then tried to implement it and realised everything is outdated so it doesnot work

realised that you must use the new fancy shmancy pipe which just COMPLICATES THINGS
for ABSOLUTELY NO REASON (that I know of)

spent like 20 mins trying to figure out and realised its straightforward BUT UNNECESSARY

then tried to find out how to use map and reduce and stuff

FINALLY FINISHED in like 3 hours.

SHITTY V1
<!-- 
findRecordings(id: string, offset:number = 0, recordings: Array<JSON> = []) {
    this.http.get<JSON>(searchRecordings(id, 100, offset), httpOptions).subscribe(result => this.check(result, id, recordings));
  }

  private check(result: JSON, id: string, recordings: Array<JSON>): Array<JSON> {
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
  } -->