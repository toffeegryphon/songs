import { Injectable } from '@angular/core';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CleanService {

  constructor() { }

  // Clean up artist JSON to return artist object with only required fields.
  artist(dirty: JSON): Object {
    console.log(dirty);

    let cleaned = {
      'id' : dirty['id'],
      'name' : dirty['name']
    };

    console.log(cleaned);
    return cleaned;
  }

  // Clean up recordings array to return recordings array with only required fields and sorted in order
  recordings(dirty: Array<Object>): any {
    
    let results: Array<Object> = new Array(dirty.length); // At most equal length
    let set: Set<string> = new Set();

    // O(n)
    // TODO include which albums they are in
    // TODO select songs, result which album(s) to buy
    results = dirty.map(recording => {
      // BUG**** Only can english characters. Need to include other chars in replace regex
      let title: string = recording['title'].replace(/\(.*\)/g, '').trim();
      let code: string = title.toLowerCase().replace(/\[.*\]/g, '').replace(/\{.*\}/g, '').replace(/[^\w]/g, '');
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

    // Use a better sort function
    results.sort((a, b) => (a['code'] > b['code']) ? 1 : -1);

    return results;
  }
}
