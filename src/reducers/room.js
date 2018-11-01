import * as types from '~/actions/actionTypes';

import initialState from './initialState';

export default function authReducer(state = initialState.room, action) {
  switch (action.type) {
    case types.MESSAGE_LOAD_SUCCESS: {
      let data = action.payload;
      const ids = state.messages.map(({id}) => id);
      if (!state.messages.length) data = data.reverse();
      return Object.assign({}, state, {
        messages: ([
          ...data.filter(({ id }) => !ids.includes(id)),
          ...state.messages,
        ]),
      });
    }
    default:
      return state;
  }
}
