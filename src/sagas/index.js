import sagaMiddleware from './middleware';
import errorsSaga from './errors';
import chatxSaga from './chatx';

export default function runSagas() {
  sagaMiddleware.run(errorsSaga);
  sagaMiddleware.run(chatxSaga);
}
