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
      findAll: '/user/find-all',
      findById: '/user/findById',
      create: '/user/create',
      update: '/user/update',
      delete: '/user/delete',
    },
    comments: {},
    pois: {},
  },
};
