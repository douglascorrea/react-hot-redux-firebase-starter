import {
  addedMessage, removedMessage, changedMessage,
  leaveChat,
  selectRoom, joinedRoom, leftRoom,
} from '../../actions/chatxActions';

const createSelectedRoomMiddleware = (firebaseApi) => {
  let unsubscribers = [];
  const unsubJoinedRoom = () => {
    unsubscribers.forEach(u => u());
    unsubscribers = [];
  };

  return ({ dispatch }) => (next) => async (action) => {
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
        firebaseApi.Watch(`/messages/${roomId}`, 'child_added', (msg, id) => {
          dispatch(addedMessage({ room: roomId, message: { ...msg, id } }));
        }),
        firebaseApi.Watch(`/messages/${roomId}`, 'child_removed', (msg, id) => {
          dispatch(removedMessage({ room: roomId, message: { ...msg, id } }));
        }),
        firebaseApi.Watch(`/messages/${roomId}`, 'child_changed', (msg, id) => {
          dispatch(changedMessage({ room: roomId, message: { ...msg, id } }));
        }),
      );
    }

    if (action.type === `${leaveChat}`) {
      unsubJoinedRoom();
    }

    return next(action);
  };
};

export default createSelectedRoomMiddleware;
