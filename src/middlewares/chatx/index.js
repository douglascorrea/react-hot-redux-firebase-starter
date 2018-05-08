import { pipeMiddlewares } from 'redux-fun';

import createRoomsMiddleware from './rooms';
import createSelectedRoomMiddleware from './selectedRoom';
import createJoinedRoomsMiddleware from './joinedRooms';

const createChatxMiddleware = api => pipeMiddlewares(
  createRoomsMiddleware(api),
  createSelectedRoomMiddleware(api),
  createJoinedRoomsMiddleware(api),
);

export default createChatxMiddleware;
