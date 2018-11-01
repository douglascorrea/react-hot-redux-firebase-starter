import * as types from './actionTypes';

export function onLoadMessage(data) {
  return {
    type: types.MESSAGE_LOAD_SUCCESS,
    payload: data,
  };
}
