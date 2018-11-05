export default {
  routesPermissions: {
    requireAnonymous: [
      '/login',
      '/signup',
    ],
    requireAuth: [
      '/admin',
    ],
    routesRequireAdmin: [
      '/admin',
    ],
  },
  routing: {},
  user: {},
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false,
  },
  ajaxCallsInProgress: 0,
  room: {
    users: [],
    rooms: [{
      id: 'general',
      name: 'General',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }],
    messages: [],
  },
};
