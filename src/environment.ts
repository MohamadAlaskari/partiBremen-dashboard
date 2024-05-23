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
      logout:'/user/logout',
      findAll: '/user',
      findById: '/user',
      create: '/user',
      update: '/user',
      delete: '/user',
    },
    comments: {
      getAll: '/comment',
      delete: '/comment',
    },
    pois: {
      findAll: '/poi',
      findOnly: '/poi/Only',
      findById: '/poi',
      findByUserId:'/poi/user',
      update: '/poi',
      delete: '/poi',
    },
  },
};
