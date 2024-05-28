/**
 * Environment variables:
 * - baseUrl: The base url for the backend api
 * - endpoints:
 */
// environments/environment.prod.ts (für Produktion)

export const environment = {
  production: true,
  mapbox: {
    accessToken:
      'pk.eyJ1IjoibWFsYXNrYXJpIiwiYSI6ImNscWY3NnBhZjBreWsybG80aWRudGNzZXcifQ.imp0Xbfmt_kfXqgRrFIv0Q',
  },
  apiBaseUrl: 'https://api.partibremen.student.28apps-software.de',
  endpoints: {
    users: {
      login: '/user/login',
      logout: '/user/logout',
      findAll: '/user',
      findById: '/user',
      create: '/user',
      update: '/user',
      delete: '/user',
    },
    report: {
      findAll: '/report',
      findById: '/report',
      create: 'report',
      findRebortsByRebortedUserId: '/reports/user',
      findRebortsByRebortedPoiId: '/reports/comment',
      findRebortsByRebortedCommentId: '/reports/poi',
      update: '/report/update',
      delete: '/report',
    },
    comments: {
      getAll: '/comment',
      delete: '/comment',
      create: '/comment',
    },
    pois: {
      findAll: '/poi',
      findOnly: '/poi/Only',
      findById: '/poi',
      findByUserId: '/poi/user',
      update: '/poi',
      delete: '/poi',
    },
  },
};
