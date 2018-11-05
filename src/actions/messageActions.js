import * as types from './actionTypes';

export function onLoadedMessages(data) {
  return {
    type: types.MESSAGE_ON_LOADED,
    payload: data,
  };
}
