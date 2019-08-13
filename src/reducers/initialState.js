export default {
  routesPermissions: {
    requireAuth: ["/admin"],
    routesRequireAdmin: ["/admin"]
  },
  routing: {},
  user: {
    isAdmin: undefined
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  chat: { rooms: {} },
  ajaxCallsInProgress: 0
};
