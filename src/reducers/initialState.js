export default {
  routing: {},
  user: {
    isAdmin: undefined,
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false,
  },
  ajaxCallsInProgress: 0,
  chatx: {
    enabled: false,
    rooms: {},
    currentRoom: null,
  },
};
