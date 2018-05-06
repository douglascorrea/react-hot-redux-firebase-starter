import { pipeMiddlewares } from 'redux-fun';
import {
  enterChat, leaveChat,
  refreshJoinedRooms, selectRoom, joinedRoom, leftRoom,
} from '../../actions/chatxActions';

const joinedRoomsObserver = (firebaseApi) => {
  let unsubscribers = [];
  const unsubJoinedRoom = () => {
    unsubscribers.forEach(u => u());
    unsubscribers = [];
  };

  return ({ dispatch }) => (next) => (action) => {
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
