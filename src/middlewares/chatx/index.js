import { pipeMiddlewares } from 'redux-fun';

import createSelectedRoomMiddleware from './selectedRoom';
import createJoinedRoomsMiddleware from './joinedRooms';

const createChatxMiddleware = api => pipeMiddlewares(
  createSelectedRoomMiddleware(api),
  createJoinedRoomsMiddleware(api),
);

export default createChatxMiddleware;
