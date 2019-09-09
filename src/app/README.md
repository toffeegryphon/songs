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