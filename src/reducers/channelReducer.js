import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function channelReducer(state = initialState.channel, action) {
    switch (action.type) {
        case types.GET_MESSAGE_SUCCESS:
            return Object.assign({}, state, action.payload);
        case types.USER_JOINED_CHANNEL:
            return Object.assign({}, state, action.payload);
        case types.USER_LEFT_CHANNEL:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
