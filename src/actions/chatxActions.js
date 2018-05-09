import { createAction } from 'redux-actions';

/* UI actions *************************************************************** */
// chat
export const enterChat = createAction('UI/CHATX/ENTER_CHAT');
export const leaveChat = createAction('UI/CHATX/LEAVE_CHAT');

// rooms
export const createRoom = createAction('UI/CHATX/CREATE_ROOM');
export const removeRoom = createAction('UI/CHATX/REMOVE_ROOM');
export const joinRoom = createAction('UI/CHATX/JOIN_ROOM');
export const leaveRoom = createAction('UI/CHATX/LEAVE_ROOM');
export const selectRoom = createAction('UI/CHATX/SELECT_ROOM');

// prompt
export const changedUserMessage = createAction('UI/CHATX/CHANGED_USER_MESSAGE');
export const sendMessage = createAction('UI/CHATX/SEND_MESSAGE');

// messages
export const removeMessage = createAction('UI/CHATX/REMOVE_MESSAGE');
/* ************************************************************************** */

/* Users ******************************************************************** */
export const addedUser = createAction('CHATX/ADDED_USER');
export const removedUser = createAction('CHATX/REMOVED_USER');
export const changedUser = createAction('CHATX/CHANGED_USER');
/* ************************************************************************** */

/* Rooms ******************************************************************** */
export const addedRoom = createAction('CHATX/ADDED_ROOM');
export const removedRoom = createAction('CHATX/REMOVED_ROOM');
export const changedRoom = createAction('CHATX/CHANGED_ROOM');
/* ************************************************************************** */

/* Joined rooms ************************************************************* */
export const joinedRoom = createAction('CHATX/JOINED_ROOM');
export const leftRoom = createAction('CHATX/LEFT_ROOM');
export const refreshJoinedRooms = createAction('CHATX/REFRESH_JOINED_ROOMS');
/* ************************************************************************** */

/* Messages ***************************************************************** */
export const addedMessage = createAction('CHATX/ADDED_MESSAGE');
export const removedMessage = createAction('CHATX/REMOVED_MESSAGE');
export const changedMessage = createAction('CHATX/CHANGED_MESSAGE');
/* ************************************************************************** */
