import { createAction } from 'redux-actions';

export const enterChat = createAction('CHATX/ENTER_CHAT');
export const leaveChat = createAction('CHATX/LEAVE_CHAT');

export const selectRoom = createAction('CHATX/SELECT_ROOM');

export const createRoom = createAction('CHATX/CREATE_ROOM');
export const removeRoom = createAction('CHATX/REMOVE_ROOM');

export const addedRoom = createAction('CHATX/ADDED_ROOM');
export const removedRoom = createAction('CHATX/REMOVED_ROOM');
export const changedRoom = createAction('CHATX/CHANGED_ROOM');

export const joinedRoom = createAction('CHATX/JOINED_ROOM');
export const leftRoom = createAction('CHATX/LEFT_ROOM');

export const refreshJoinedRooms = createAction('CHATX/REFRESH_JOINED_ROOMS');
