import { getCurrentUserUID } from '../../selectors/authSelectors';
import { sendMessage } from '../../actions/chatxActions';

const createMessagesMiddleware = (firebaseApi) => {
  return ({ getState }) => (next) => async (action) => {
    if (action.type === `${sendMessage}`) {
      const { room, message } = action.payload;
      try {
        const newMessage = {
          content: message,
          author: getCurrentUserUID(getState()),
          createdAt: firebaseApi.SERVER_TIMESTAMP,
        };
        await firebaseApi.databasePush(`/messages/${room}/`, newMessage);
        return next(action);
      } catch (err) {
        return next(sendMessage(err));
      }
    }
    return next(action);
  };
};

export default createMessagesMiddleware;
