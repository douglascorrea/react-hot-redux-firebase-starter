import { pipeMiddlewares } from 'redux-fun';

import createRoomsMiddleware from './rooms';
import createUsersMiddleware from './users';
import createJoinedRoomsMiddleware from './joinedRooms';

const createChatxMiddleware = api => pipeMiddlewares(
  createUsersMiddleware(api),
  createRoomsMiddleware(api),
  createJoinedRoomsMiddleware(api),
);

export default createChatxMiddleware;
