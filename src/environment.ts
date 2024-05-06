/**
 * Environment variables:
 * - baseUrl: The base url for the backend api
 * - endpoints:
 */
// environments/environment.prod.ts (für Produktion)
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.partibremen.student.28apps-software.de',
  endpoints: {
    users: {
      login: '/user/login',
      findAll: '/user',
      findById: '/user',
      create: '/user',
      update: '/user',
      delete: '/user',
    },
    comments: {
      getAll: '/comment',
    },
    pois: {
      findAll: '/poi',
      findOnly: '/poi/Only',
      findById: '/poi',
      update: '/poi',
    },
  },
};
