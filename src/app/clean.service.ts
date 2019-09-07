import { Injectable } from '@angular/core';

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

  recordings(dirty: JSON): any {

    let results: Array<Object>;

    let recording = dirty['recordings'][0];
    let title: String = recording['title'].replace(/\(.*\)/g, '');
    console.log(title);

    //TODO If after clean title is empty delete entry

    // dirty['recordings'].forEach(recording => {
    //   let title: String = recording['title'].replace(/\(.*\)/g, '');
    //   console.log()
    //   let cleaned: Object = {
    //     'id' : recording['id'],
    //     'title' : recording['title'],
    //   }
    // });
  }
}
