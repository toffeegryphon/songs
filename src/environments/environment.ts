// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyDrNeXR0jCpQ3xOaQT2Sm0d5Jy2Qi8V0GU",
    authDomain: "songs-522b9.firebaseapp.com",
    databaseURL: "https://songs-522b9.firebaseio.com",
    projectId: "songs-522b9",
    storageBucket: "",
    messagingSenderId: "749099498662",
    appId: "1:749099498662:web:c3e8f878f8317a72370867"
  }
};

export const root = (query:string, limit:number = 3, offset:number = 0) => 
  `https://musicbrainz.org/ws/2/artist?query=${query}?limit=${limit}?offset=${offset}`;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
