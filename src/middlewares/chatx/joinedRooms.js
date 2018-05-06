import { pipeMiddlewares } from 'redux-fun';
import {
  enterChat, leaveChat,
  refreshJoinedRooms, selectRoom, joinedRoom, leftRoom, joinRoom, leaveRoom,
} from '../../actions/chatxActions';

import { getCurrentUserUID } from '../../selectors/authSelectors';

const joinedRoomsObserver = (firebaseApi) => {
  let unsubscribers = [];
  const unsubJoinedRoom = () => {
    unsubscribers.forEach(u => u());
    unsubscribers = [];
  };

  return ({ dispatch, getState }) => (next) => async (action) => {
    if (action.type === `${selectRoom}`) {
      unsubJoinedRoom();
      const roomId = action.payload;
      unsubscribers.push(
        firebaseApi.Watch(`/joinedRooms/${roomId}`, 'child_added', (_, userId) => {
          dispatch(joinedRoom({ room: roomId, user: userId }));
        }),
        firebaseApi.Watch(`/joinedRooms/${roomId}`, 'child_removed', (_, userId) => {
          dispatch(leftRoom({ room: roomId, user: userId }));
        }),
      );
    }

    if (action.type === `${leaveChat}`) {
      unsubJoinedRoom();
    }

    if (action.type === `${joinRoom}`) {
      const roomId = action.payload;
      const userId = getCurrentUserUID(getState());
      await firebaseApi.databasePush(`/joinedRooms/${roomId}/${userId}`, true);
    }

    if (action.type === `${leaveRoom}`) {
      const roomId = action.payload;
      const userId = getCurrentUserUID(getState());
      await firebaseApi.databaseRemove(`/joinedRooms/${roomId}/${userId}`);
    }

    return next(action);
  };
};

const joinedRoomsInit = (firebaseApi) => {
  return ({ dispatch }) => (next) => async (action) => {
    if (action.type === `${enterChat}`) {
      const joinedRooms = await firebaseApi.GetValue('/joinedRooms');
      await dispatch(refreshJoinedRooms(joinedRooms || {}));
    }
    return next(action);
  };
};

const createJoinedRoomsMiddleware = api => pipeMiddlewares(
  joinedRoomsInit(api),
  joinedRoomsObserver(api),
);

export default createJoinedRoomsMiddleware;
