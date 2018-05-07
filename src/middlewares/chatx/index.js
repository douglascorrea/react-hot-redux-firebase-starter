import { pipeMiddlewares } from 'redux-fun';

import createRoomsMiddleware from './rooms';
import createUsersMiddleware from './users';
import createSelectedRoomMiddleware from './selectedRoom';
import createJoinedRoomsMiddleware from './joinedRooms';
import createMessagesMiddleware from './messages';

const createChatxMiddleware = api => pipeMiddlewares(
  createUsersMiddleware(api),
  createRoomsMiddleware(api),
  createSelectedRoomMiddleware(api),
  createJoinedRoomsMiddleware(api),
  createMessagesMiddleware(api),
);

export default createChatxMiddleware;
