import { getCurrentRoom, getFirstRoom }  from '../../selectors/chatxSelectors';
import { getCurrentUserUID } from '../../selectors/authSelectors';
import {
  enterChat, leaveChat,
  createRoom, removeRoom, selectRoom, joinRoom,
  addedRoom, removedRoom, changedRoom,
} from '../../actions/chatxActions';

const createRoomsMiddleware = (firebaseApi) => {
  let unsubscribers = [];
  const unsubsribeAll = () => {
    unsubscribers.forEach(u => u());
    unsubscribers = [];
  };

  return ({ dispatch, getState }) => (next) => async (action) => {
    const selectFirstRoom = () => dispatch => {
      const firstRoom = getFirstRoom(getState());
      if (firstRoom) {
        return dispatch(selectRoom(firstRoom.id));
      }
    };

    if (action.type === `${enterChat}`) {
      unsubscribers.push(
        firebaseApi.Watch('/rooms', 'child_added', (room, id) => {
          dispatch(addedRoom({ ...room, id }));
        }),
        firebaseApi.Watch('/rooms', 'child_removed', (room, id) => {
          dispatch(removedRoom({ ...room, id }));
        }),
        firebaseApi.Watch('/rooms', 'child_changed', (room, id) => {
          dispatch(changedRoom({ ...room, id }));
        }),
      );

      const nexted = await next(action);
      await dispatch(selectFirstRoom());
      return nexted;
    }
    if (action.type === `${leaveChat}`) {
      unsubsribeAll();
      return next(action);
    }
    if (action.type === `${createRoom}`) {
      const nexted = await next(action);
      try {
        const newRoom = {
          name: action.payload,
          author: getCurrentUserUID(getState()),
          createdAt: firebaseApi.SERVER_TIMESTAMP,
        };
        const roomSnap = await firebaseApi.databasePush('/rooms', newRoom);
        await dispatch(joinRoom(roomSnap.key));
        await dispatch(selectRoom(roomSnap.key));
        return nexted;
      } catch (err) {
        return dispatch(createRoom(err));
      }
    }
    if (action.type === `${removeRoom}`) {
      try {
        const roomId = action.payload;
        const currentRoom = getCurrentRoom(getState());
        await firebaseApi.databaseRemove(`/joinedRooms/${roomId}`);
        await firebaseApi.databaseRemove(`/messages/${roomId}`);
        await firebaseApi.databaseRemove(`/rooms/${roomId}`);
        if (currentRoom && roomId === currentRoom.id) {
          await dispatch(selectFirstRoom());
        }
        return next(action);
      } catch (err) {
        return next(removeRoom(err));
      }
    }
    return next(action);
  };
};

export default createRoomsMiddleware;
