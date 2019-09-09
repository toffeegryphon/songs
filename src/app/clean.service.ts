import { Injectable } from '@angular/core';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CleanService {

  constructor() { }

  clean(dirty: JSON): Object {
    console.log(dirty);

    let cleaned = {
      'id' : dirty['id'],
      'name' : dirty['name']
    };

    console.log(cleaned);
    return cleaned;
  }

  recordings(dirty: Array<Object>): any {

    // O(n)
    // TODO include which albums they are in
    let results: Array<Object> = new Array(dirty.length); // At most equal length
    let set: Set<string> = new Set();

    results = dirty.map(recording => {
      let title: string = recording['title'].replace(/\(.*\)/g, '').trim();
      let code: string = title.toLowerCase().replace(/\[.*\]/g, '').replace(/\{.*\}/g, '').replace(/[^\w]/g, '');
      console.log(code);
      console.log(set.has(code));
      if (!set.has(code)) {
        set.add(code);
        let cleaned: Object = {
          'id'    : recording['id'],
          'title' : title,
          'code'  : code,
        };
        return cleaned;
      }
    }).filter( recording => !isUndefined(recording));
    console.log(results);
  }
}
