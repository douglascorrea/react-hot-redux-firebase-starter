import {
  enterChat, leaveChat,
} from '../../actions/chatxActions';

import { addedUser, removedUser, changedUser } from '../../actions/usersActions';

const createUsersMiddleware = (firebaseApi) => {
  let unsubscribers = [];
  const unsubsribeAll = () => {
    unsubscribers.forEach(u => u());
    unsubscribers = [];
  };

  return ({ dispatch }) => (next) => async (action) => {
    if (action.type === `${enterChat}`) {
      unsubscribers.push(
        firebaseApi.Watch('/users', 'child_added', (user) => {
          dispatch(addedUser(user));
        }),
        firebaseApi.Watch('/users', 'child_removed', (user) => {
          dispatch(removedUser(user));
        }),
        firebaseApi.Watch('/users', 'child_changed', (user) => {
          dispatch(changedUser(user));
        }),
      );

      return next(action);
    }
    if (action.type === `${leaveChat}`) {
      unsubsribeAll();
      return next(action);
    }
    return next(action);
  };
};

export default createUsersMiddleware;
