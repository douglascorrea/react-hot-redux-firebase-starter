export default {
  routesPermissions: {
    requireAuth: [
      '/admin'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    currentUserUID: null,
    currentUserEmail: null,
    isAdmin: undefined
  },
  auth: {
    isLogged: false,
    initialized: false
  },
  room : {
     message: {},
     messageContainer : []
 },
  ajaxCallsInProgress: 0
};
