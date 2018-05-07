import { createAction } from 'redux-actions';

/* Main actions */
export const enterChat = createAction('UI/CHATX/ENTER_CHAT');
export const leaveChat = createAction('UI/CHATX/LEAVE_CHAT');
export const selectRoom = createAction('UI/CHATX/SELECT_ROOM');

/* Rooms */
export const createRoom = createAction('UI/CHATX/CREATE_ROOM');
export const removeRoom = createAction('UI/CHATX/REMOVE_ROOM');
export const addedRoom = createAction('CHATX/ADDED_ROOM');
export const removedRoom = createAction('CHATX/REMOVED_ROOM');
export const changedRoom = createAction('CHATX/CHANGED_ROOM');

/* Joined rooms */
export const joinRoom = createAction('UI/CHATX/JOIN_ROOM');
export const leaveRoom = createAction('UI/CHATX/LEAVE_ROOM');
export const joinedRoom = createAction('CHATX/JOINED_ROOM');
export const leftRoom = createAction('CHATX/LEFT_ROOM');
export const refreshJoinedRooms = createAction('CHATX/REFRESH_JOINED_ROOMS');

/* Messages */
export const changedUserMessage = createAction('UI/CHATX/CHANGED_USER_MESSAGE');
export const sendMessage = createAction('UI/CHATX/SEND_MESSAGE');
export const addedMessage = createAction('CHATX/ADDED_MESSAGE');
export const removedMessage = createAction('CHATX/REMOVED_MESSAGE');
export const changedMessage = createAction('CHATX/CHANGED_MESSAGE');
