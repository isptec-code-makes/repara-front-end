// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    appName: 'SOGES',
    configFile: '/config.json',
    httpRequestRetry: 2,
    socialLogin: {
        google:{
            clientId: '613819820607-ndfqvo08pkndcuond79r0ufms8anj143.apps.googleusercontent.com'
        },
        facebook: {
            clientId: 'facebook-client-id'
        }
    }
};
