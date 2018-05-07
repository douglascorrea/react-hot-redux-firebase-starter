import { enterChat, refreshJoinedRooms, joinRoom, leaveRoom } from '../../actions/chatxActions';

import { getCurrentUserUID } from '../../selectors/authSelectors';

const createJoinedRoomsMiddleware = (firebaseApi) => {
  return ({ dispatch, getState }) => (next) => async (action) => {
    if (action.type === `${enterChat}`) {
      const joinedRooms = await firebaseApi.GetValue('/joinedRooms');
      await dispatch(refreshJoinedRooms(joinedRooms || {}));
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

export default createJoinedRoomsMiddleware;
