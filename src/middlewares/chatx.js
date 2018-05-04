import { getCurrentUserUID } from '../selectors/authSelectors';
import {
  enterChat, leaveChat,
  createRoom, removeRoom,
  addedRoom, removedRoom, changedRoom,
} from '../actions/chatxActions';

const noop = () => {};

const createChatxMiddleware = (firebaseApi) => {
  let unsubsribeAll = noop;
  return ({ dispatch, getState }) => (next) => async (action) => {
    if (action.type === `${enterChat}`) {
      const unsubscribers = [
        firebaseApi.Watch('/rooms', 'child_added', (room, id) => {
          dispatch(addedRoom({ ...room, id }));
        }),
        firebaseApi.Watch('/rooms', 'child_removed', (room, id) => {
          dispatch(removedRoom({ ...room, id }));
        }),
        firebaseApi.Watch('/rooms', 'child_changed', (room, id) => {
          dispatch(changedRoom({ ...room, id }));
        }),
      ];

      unsubsribeAll = () => {
        unsubscribers.forEach(u => u());
        unsubsribeAll = noop;
      };
      return next(action);
    }
    if (action.type === `${leaveChat}`) {
      unsubsribeAll();
      return next(action);
    }
    if (action.type === `${createRoom}`) {
      try {
        const newRoom = {
          name: action.payload,
          author: getCurrentUserUID(getState()),
          createdAt: firebaseApi.SERVER_TIMESTAMP,
        };
        await firebaseApi.databasePush('/rooms', newRoom);
        return next(action);
      } catch (err) {
        return next(createRoom(err));
      }
    }
    if (action.type === `${removeRoom}`) {
      try {
        const roomId = action.payload;
        await firebaseApi.databaseRemove(`/rooms/${roomId}`);
        return next(action);
      } catch (err) {
        return next(removeRoom(err));
      }
    }
    return next(action);
  };
};

export default createChatxMiddleware;
