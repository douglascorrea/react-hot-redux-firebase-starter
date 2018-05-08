import { pipeMiddlewares } from 'redux-fun';

import createSelectedRoomMiddleware from './selectedRoom';

const createChatxMiddleware = api => pipeMiddlewares(
  createSelectedRoomMiddleware(api),
);

export default createChatxMiddleware;
