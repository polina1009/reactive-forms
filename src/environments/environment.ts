// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAnqaVU3g1MtYoCUOsWoMwYKAzfSSyhuNc',
    authDomain: 'pat-med-s.firebaseapp.com',
    databaseURL: 'https://pat-med-s.firebaseio.com',
    projectId: 'pat-med-s',
    storageBucket: 'pat-med-s.appspot.com',
    messagingSenderId: '699402895496'
  }
};
