import * as types from '~/actions/actionTypes';

import initialState from './initialState';

export default function authReducer(state = initialState.room, action) {
  switch (action.type) {
    case types.MESSAGE_LOAD_SUCCESS: {
      const ids = state.messages.map(({id}) => id);
      return Object.assign({}, state, {
        messages: ([
          ...action.payload
            .filter(({ id }) =>
              !ids.includes(id)
            ).reverse(),
          ...state.messages,
        ]),
      });
    }
    default:
      return state;
  }
}
