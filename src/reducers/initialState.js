export default {
  routesPermissions: {
    requireAuth: [
      '/admin',
      '/chat'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    isAdmin: undefined
  },
  chatRooms: [],
  messages: [],
  users: [],
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  ajaxCallsInProgress: 0
};
