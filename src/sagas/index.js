import sagaMiddleware from './middleware';

import chatxSaga from './chatx';
import errorsSaga from './errors';
import isAdminSaga from './isAdmin';

export default function runSagas() {
  sagaMiddleware.run(chatxSaga);
  sagaMiddleware.run(errorsSaga);
  sagaMiddleware.run(isAdminSaga);
}
