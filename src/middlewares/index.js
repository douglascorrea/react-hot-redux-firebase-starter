import thunk from 'redux-thunk';
import toastr from 'toastr';

import createErrorsMiddleware from './errors';
import createChatxMiddleware from './chatx';
import firebaseApi from '../api/firebase';

export default [
  thunk,
  createChatxMiddleware(firebaseApi),
  createErrorsMiddleware(toastr),
];
