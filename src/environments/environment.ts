// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const ViaCepHost = "https://viacep.com.br/ws";

export const BACKEND_API_HOST = "http://localhost:8090";

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

export const API_PROPERTY = `${BACKEND_API_HOST}/api/properties`;
export const API_SEARCH_PROPERTIES = `${API_PROPERTY}/search`;
export const API_PROPERTY_IMAGES = `${API_PROPERTY}/images`