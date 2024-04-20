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
      findAll: '/user',
      findById: '/user/find-by-id',
      create: '/user/create',
      update: '/user/update',
      delete: '/user/delete',
    },
    comments: {},
    pois: {},
  },
};
