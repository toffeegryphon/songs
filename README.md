TODO Auto Recreate/Recheck after x dates or button to force refresh

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

---

### Database (Firebase Firestore)

#### `addArtist(artist: object)`

> Checks if `artist` exists in Database, and adds if it does not.

#### `getArtist(artistId: string): Observable<any>`

> Gets `Observable` artist of `artistId`. Get recordings by subscribing and calling `artist.data().recordings`.

#### `addRecordings(recordings: object[], artistId: string)`

> Adds `recordings` to artist of `artistId`. Uses `filter` to remove recordings that already exist in database, then adds them. (However, it is probably faster and more efficient to just `set(recordings)` straightaway.)


# Songs2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
