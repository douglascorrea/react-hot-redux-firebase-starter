import { getCurrentUserUID } from '../../selectors/authSelectors';
import { sendMessage } from '../../actions/chatxActions';

const createMessagesMiddleware = (firebaseApi) => {
  return ({ getState, dispatch }) => (next) => async (action) => {
    if (action.type === `${sendMessage}`) {
      const nexted = next(action);
      const { room, message } = action.payload;
      try {
        const newMessage = {
          content: message,
          author: getCurrentUserUID(getState()),
          createdAt: firebaseApi.SERVER_TIMESTAMP,
        };
        await firebaseApi.databasePush(`/messages/${room}/`, newMessage);
      } catch (err) {
        return dispatch(sendMessage(err));
      }
      return nexted;
    }
    return next(action);
  };
};

export default createMessagesMiddleware;
